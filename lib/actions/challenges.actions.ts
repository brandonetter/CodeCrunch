import console from "console";
import prisma from "../prisma";
import { unstable_cache as cache } from "next/cache";

type searchType = {
  page?: string | number | undefined;
  limit?: string | number | undefined;
  asc?: string;
  desc?: string;
  [key: string]: string | number | undefined;
};

const _getChallenges = async (search: searchType = {}) => {
  let { page = 1, limit = 5, asc, desc, ...rest } = search;
  page = Number(page);
  limit = Number(limit);

  let query = prisma.challenges.findMany({
    where: {
      ...Object.keys(rest).reduce((acc: { [key: string]: {} }, key) => {
        acc[key] = {
          contains: search[key as keyof typeof search],
          mode: "insensitive",
        };
        return acc;
      }, {}),
    },
    orderBy: {
      [asc || desc || "id"]: asc ? "asc" : "desc",
    },
    skip: (page - 1) * limit,
    take: page * limit + 1,
  });

  const data = await query;

  // Determine if there's a next page by the presence of an extra item
  const hasNextPage = data.length > limit;

  // If there's an extra item, remove it from the results
  const responseData = hasNextPage ? data.slice(0, -1) : data;
  // console.log(responseData, hasNextPage, count);
  return { data: responseData, nextPage: hasNextPage };
};

export const getChallenges = cache(_getChallenges, ["challenges"], {
  revalidate: 120,
});

const _getChallenge = async (name: string) => {
  const urlDecodedName = decodeURIComponent(name);
  const data = await prisma.challenges.findFirst({
    where: {
      name: urlDecodedName,
    },
  });

  return data;
};

export const getChallenge = cache(_getChallenge, ["challenge"], {
  revalidate: 120,
});
