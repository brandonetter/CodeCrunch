"use server";
import { createRun } from "../actions/challengeruns.actions";
import { getChallenge } from "../actions/challenges.actions";
import { getUserByEmail, updatePoints } from "./user.actions";
import { getSession } from "../db";

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
  const challengeName = decodeURIComponent(challenge);

  // fetch the challenge from the database

  const challengeData = await getChallenge(challengeName);

  if (!challengeData?.inputs || !challengeData?.outputs) {
    return { stderr: "Challenge not found", stdout: [] };
  }

  const tests = JSON.parse(challengeData.inputs);
  const expectedOutputs = JSON.parse(challengeData.outputs);

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
    if (stdout != expectedOutput) {
      responseArray[index].success = false;
      responseArray[index].output = stdout;
    }
  });

  const session = await getSession();
  const user = session && (await getUserByEmail(session.user.email));

  if (!user) {
    return { stderr: "User not found", stdout: [] };
  }

  // we don't need to wait for these to finish,
  // so we don't need to await it
  // we're sacrificing the ability to know if the
  // database writes were successful, but we're
  // also not blocking the user from seeing their
  // results quickly- giving them a better experience
  createRun(user.id, {
    id: challengeData.id,
    result: responseArray.every((response) => response.success)
      ? "pass"
      : "fail",
    time: finalTime,
  });

  if (responseArray.every((response) => response.success)) {
    updatePoints(user.id, challengeData);
  }

  return { stderr: errorText, stdout: responseArray };
}
