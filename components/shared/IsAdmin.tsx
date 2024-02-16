import { getSession } from "@/lib/db";
import React from "react";
export default async function IsAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session && session.user.role === "admin") {
    return <>{children}</>;
  }
  return null;
}
