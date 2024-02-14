"use server";
import { _getChallenge } from "../supabase/actions/challenges";
export async function runCode(code: string, challenge: string) {
  // decode challenge from URL
  const challengeName = decodeURIComponent(challenge);

  // fetch the challenge from the database

  const challengeData = await _getChallenge(challengeName);

  const tests = JSON.parse(challengeData.inputs);
  const expectedOutputs = JSON.parse(challengeData.outputs);

  const responsePromises = tests.map((test: any) => {
    return fetch(process.env.PISTON_BASE_URL!, {
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
  });

  const responseData = await Promise.all(responsePromises);
  const responses = await Promise.all(
    responseData.map((response) => response.json())
  );
  let responseText = "";
  let errorText = "";
  expectedOutputs.forEach((expectedOutput: any, index: number) => {
    const { stderr, stdout } = responses[index].run;
    if (stderr) {
      errorText += stderr + "\n";
    }
    if (stdout != expectedOutput) {
      responseText += `Failed Test #${index} Expected ${expectedOutput} but got ${stdout}!\n`;
    } else {
      responseText += `Passed Test #${index} Expected ${expectedOutput} and got ${stdout}!\n`;
    }
  });

  return { stderr: errorText, stdout: responseText };
}
