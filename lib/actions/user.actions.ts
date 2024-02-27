"use server";
import prisma from "../prisma";
import { Challenge, User } from "@prisma/client";
import { hasUserPassedChallenge } from "./challengeruns.actions";
import { getSession } from "../auth";
import { unstable_cache as cache } from "next/cache";

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

async function _getUserIconById(id: string) {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  return user?.image;
}

export const getUserIconById = cache(_getUserIconById, ["userIcon"], {
  revalidate: 240,
});

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return user;
}

export async function updatePoints(user: User, challenge: Challenge) {
  const hasPassed = await hasUserPassedChallenge(user.id, challenge.id);
  // If the user has already passed the challenge, don't update their points
  if (hasPassed) {
    return false;
  }
  console.log("updating points");

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      points: {
        increment: challenge.points!,
      },
      PointTransaction: {
        create: {
          points: challenge.points!,
          reason: `Completed challenge:`,
          challengeId: challenge.id,
          challengeName: challenge.name,
          userName: user?.name,
        },
      },
    },
  });

  return true;
}
