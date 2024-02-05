"use server";
import { unstable_cache } from "next/cache";
import { supabase } from "@/lib/supabase/server";

type searchType = {
  page?: string | number | undefined;
  limit?: string | number | undefined;
  asc?: string;
  desc?: string;
  [key: string]: string | number | undefined;
};

export async function _getChallenge(name: string) {
  const urlDecodedName = decodeURIComponent(name);
  const { data, error } = await supabase
    .from("challenges")
    .select("*")
    .eq("name", urlDecodedName)
    .single();

  console.log(data, error);

  if (error) {
    throw error;
  }

  return data;
}
export const getChallenge = unstable_cache(_getChallenge, ["challenge"], {
  revalidate: 120,
});
export async function _getChallenges(search: searchType = {}) {
  let { page = 1, limit = 5, asc, desc, ...rest } = search;
  page = Number(page);
  limit = Number(limit);
  let query = supabase.from("challenges").select("*");

  Object.keys(rest).forEach((key) => {
    query = query.ilike(key, `%${search[key as keyof typeof search]}%`);
  });

  if (asc) {
    query = query.order(asc, { ascending: true });
  }
  if (desc) {
    query = query.order(desc, { ascending: false });
  }

  // Use page and limit to calculate the range, fetch one extra item
  query = query.range((page - 1) * limit, page * limit);

  const { data, error, count } = await query;

  if (error) {
    throw error;
  }
  console.log(data, error, count);
  // Determine if there's a next page by the presence of an extra item
  const hasNextPage = data.length > limit;

  // If there's an extra item, remove it from the results
  const responseData = hasNextPage ? data.slice(0, -1) : data;
  // console.log(responseData, hasNextPage, count);
  return { data: responseData, nextPage: hasNextPage, totalCount: count };
}

export const getChallenges = unstable_cache(_getChallenges, ["challenges"], {
  revalidate: 120,
});
