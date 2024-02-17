"use server";

import prisma from "../prisma";
import { unstable_cache as cache, revalidateTag } from "next/cache";

export async function createRun(
  userId: string,
  challenge: { id: number; result: string; time: number; code: string }
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
      code: challenge.code,
      result: challenge.result,
      time: challenge.time,
    },
  });

  revalidateTag("challengeRuns");
  return run;
}

export async function hasUserPassedChallenge(
  userId: string,
  challengeId: number
) {
  console.log("b");
  const run = await prisma.challengeRun.findFirst({
    where: {
      userId,
      challengeId,
      result: "pass",
    },
  });

  return !!run;
}

export async function _getChallengeRuns(userId: string, challengeId: number) {
  console.log("a");
  const runs = await prisma.challengeRun.findMany({
    where: {
      userId,
      challengeId,
    },
    take: 6,
    orderBy: {
      created_at: "desc",
    },
  });

  return runs;
}

export const getChallengeRuns = cache(_getChallengeRuns, ["challengeRuns"], {
  tags: ["challengeRuns"],
  revalidate: 120,
});
