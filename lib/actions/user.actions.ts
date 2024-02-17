"use server";
import prisma from "../prisma";
import { Challenge } from "@prisma/client";
import { hasUserPassedChallenge } from "./challengeruns.actions";
import { getSession } from "../db";

export async function getCurrentUser() {
  const session = await getSession();
  const user =
    session &&
    (await prisma.user.findFirst({
      where: {
        email: session.user.email,
      },
    }));

  return user;
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return user;
}

export async function updatePoints(userId: string, challenge: Challenge) {
  const hasPassed = await hasUserPassedChallenge(userId, challenge.id);
  // If the user has already passed the challenge, don't update their points
  if (hasPassed) {
    return;
  }
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      points: {
        increment: challenge.points!,
      },
    },
  });

  return user;
}
