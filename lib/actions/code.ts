"use server";

import fs from "fs";
import source from "@/lib/orm/index";
import { createRun } from "../actions/challengeruns.actions";
import { getChallenge } from "../actions/challenges.actions";
import { getCurrentUser, updatePoints } from "./user.actions";

export async function runCodeRepl(code: string, type: string, data?: any) {
  const user = await getCurrentUser();

  if (!user) {
    return { stderr: "User not found", stdout: [] };
  }

  const startTime = Date.now();

  if (type === "js") {
    // run regular PISTON instance
    const response = await fetch(process.env.PISTON_BASE_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: "javascript",
        version: "18.15.0",
        files: [
          {
            name: "main.mjs",
            content: code,
          },
        ],
        stdin: "",
        args: [],
        compile_timeout: 10000,
        run_timeout: 3000,
        compile_memory_limit: -1,
        run_memory_limit: -1,
      }),
    });

    const piston = await response.json();
    const finalTime = Date.now() - startTime;

    return {
      stderr: piston.run.stderr,
      stdout: piston.run.stdout,
      time: finalTime,
    };
  } else if (type === "sql") {
    const ormFiles = source;
    console.log(JSON.stringify(data));
    const headerData = `
      import createORM from "./orms.mjs";
      const prisma = createORM(${data});
      `;
    const response = await fetch(process.env.PISTON_BASE_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: "javascript",
        version: "18.15.0",
        files: [
          {
            name: "main.mjs",
            content: `${headerData}\n
            ${code}`,
          },
          {
            name: "orms.mjs",
            content: `${ormFiles}`,
          },
          // {
          //   name: "main.mjs",
          //   content: `${headerData}\n${code}`,
          // },
        ],
        stdin: "",
        args: [],
        compile_timeout: 10000,
        run_timeout: 3000,
        compile_memory_limit: -1,
        run_memory_limit: -1,
      }),
    });

    const piston = await response.json();
    const finalTime = Date.now() - startTime;
    console.log(piston);
    return {
      stderr: piston.run.stderr,
      stdout: piston.run.stdout,
      time: finalTime,
    };
  }
  return { stderr: "Invalid code", stdout: [] };
}
/**
 *
 *
 * @param code (string)
 * @param challenge (string from slug)
 * @example runCode("console.log('hello world')", "Hello%20World")
 *
 * This function is a doozy. It runs the user's code
 * against a set of tests and returns the results
 * from a piston server.
 *
 * It also logs the results of the run to the database
 * and updates the user's profile with the results.
 *
 * It's a big function, but it's doing a lot of work.
 */
export async function runCode(code: string, challenge: string) {
  // decode challenge from URL

  const user = await getCurrentUser();

  if (!user) {
    return { stderr: "User not found", stdout: [] };
  }
  const challengeName = decodeURIComponent(challenge);

  // fetch the challenge from the database

  const challengeData = await getChallenge(challengeName);

  if (!challengeData?.inputs || !challengeData?.outputs) {
    return { stderr: "Challenge not found", stdout: [] };
  }

  const tests = JSON.parse(challengeData.inputs);
  const expectedOutputs = JSON.parse(challengeData.outputs);

  // ping the piston server to check the speed
  // for the user's run
  // we revalidate the ping every 120 seconds
  const pingSpeedTime = Date.now();
  await fetch(process.env.PISTON_PING_URL!, {
    next: {
      revalidate: 120,
    },
  });
  const pingSpeed = Date.now() - pingSpeedTime;

  const startTime = Date.now();
  const responses = await Promise.all(
    tests.map(async (test: any) => {
      const response = await fetch(process.env.PISTON_BASE_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: "javascript",
          version: "18.15.0",
          files: [
            {
              name: "main.mjs",
              content: `import runner from "./remote.mjs";\nconsole.log(runner(${JSON.stringify(
                test
              )}));`,
            },
            {
              name: "remote.mjs",
              content: code,
            },
          ],
          stdin: test.input,
          args: [],
          compile_timeout: 10000,
          run_timeout: 3000,
          compile_memory_limit: -1,
          run_memory_limit: -1,
        }),
      });

      let responseJson = response.json();

      return responseJson; // Parse the JSON response directly within the map
    })
  );

  const finalTime = Date.now() - startTime;
  const responseArray: {
    test: any;
    success: boolean;
    expectedOutput: any;
    output: any;
  }[] = expectedOutputs.map((expectedOutput: any) => ({
    test: JSON.stringify(tests[expectedOutputs.indexOf(expectedOutput)]),
    expectedOutput: JSON.stringify(expectedOutput),
    success: true,
    output: JSON.stringify(expectedOutput),
  }));
  let errorText = "";
  expectedOutputs.forEach((expectedOutput: any, index: number) => {
    const { stderr, stdout } = responses[index].run;
    if (stderr) {
      errorText += stderr + "\n";
    }

    // We trim the output and expected output to remove any whitespace
    // that might cause the test to fail
    // if the output is a string
    const outTest = typeof stdout === "string" ? stdout.trim() : stdout;
    const outExpected =
      typeof expectedOutput === "string"
        ? expectedOutput.trim()
        : expectedOutput;

    if (outTest != outExpected) {
      responseArray[index].success = false;
      responseArray[index].output = stdout;
    }
  });

  const noErrors = !errorText;
  const success = responseArray.every((response) => response.success);
  let gotPoints = false;

  if (noErrors) {
    if (success) {
      gotPoints = await updatePoints(user, challengeData);
    }

    await createRun(user, {
      id: challengeData.id,
      name: challengeData.name!,
      result: responseArray.every((response) => response.success)
        ? "pass"
        : "fail",
      time: Math.floor((finalTime - pingSpeed) / tests.length),
      code: code,
    });
  }

  return {
    stderr: errorText,
    stdout: responseArray,
    ...(gotPoints && { points: challengeData.points }),
  };
}
