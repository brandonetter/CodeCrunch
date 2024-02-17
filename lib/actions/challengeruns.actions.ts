"use server";

import prisma from "../prisma";

export async function createRun(
  userId: string,
  challenge: { id: number; result: string; time: number }
) {
  const run = await prisma.challengeRun.create({
    data: {
      Challenge: {
        connect: {
          id: challenge.id,
        },
      },
      User: {
        connect: {
          id: userId,
        },
      },
      result: challenge.result,
      time: challenge.time,
    },
  });

  return run;
}

export async function hasUserPassedChallenge(
  userId: string,
  challengeId: number
) {
  const run = await prisma.challengeRun.findFirst({
    where: {
      userId,
      challengeId,
      result: "pass",
    },
  });

  return !!run;
}
