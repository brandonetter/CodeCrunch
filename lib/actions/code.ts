"use server";
import { _getChallenge } from "../supabase/actions/challenges";
export async function runCode(code: string, challenge: string) {
  // decode challenge from URL
  const challengeName = decodeURIComponent(challenge);

  // fetch the challenge from the database

  const challengeData = await _getChallenge(challengeName);
  console.log(challengeData);
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
          content: `import runner from "./remote.mjs";\nconsole.log(runner());`,
        },
        {
          name: "remote.mjs",
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
  const data = await response.json();
  console.log(data);
  const { stderr, stdout } = data.run;
  return { stderr, stdout };
}
