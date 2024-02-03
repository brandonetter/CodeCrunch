import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const supabase = createServerClient(
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
