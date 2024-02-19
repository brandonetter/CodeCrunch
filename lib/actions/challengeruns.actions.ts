"use server";

import prisma from "../prisma";
import { unstable_cache as cache, revalidateTag } from "next/cache";
import { getCurrentUser } from "./user.actions";
import { User } from "@prisma/client";

export async function createRun(
  user: User,
  challenge: {
    id: number;
    name: string;
    result: string;
    time: number;
    code: string;
  }
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
          id: user.id,
        },
      },
      challengeName: challenge.name, // some denormalization
      userName: user.name, // for the socket queries
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
  const user = await getCurrentUser();
  const runs = await prisma.challengeRun.findMany({
    where: {
      userId: user?.id,
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
