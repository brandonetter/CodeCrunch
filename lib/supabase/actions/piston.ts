"use server";

export async function executeCode(code: string) {
  const response = await fetch(process.env.PISTON_BASE_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      language: "node",
      files: [
        {
          content: code,
        },
      ],
    }),
  });

  return response.json();
}
