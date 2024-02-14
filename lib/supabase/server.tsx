"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

let supabaseClient: any = undefined;

export async function createClient() {
  if (!supabaseClient) {
    supabaseClient = createServerClient(
      process.env.SUPABASE_URL!,
      process.env.SERVICE_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookies().get(name)?.value;
          },
        },
      }
    );
  }
  return supabaseClient;
}
