"use client";
import { useUserStore } from "@/context";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { useEffect } from "react";

// will get remounted when the user logs in
// as next-auth will trigger a page refresh
// this userstate should not be used for sensitive data
// as it will be visible and modifiable by the client

export function UserSession() {
  const { setUser } = useUserStore();
  useEffect(() => {
    async function updateUserState() {
      const user = await getCurrentUser();
      setUser(user);
    }
    updateUserState();
  }, [setUser]);
  return null;
}
