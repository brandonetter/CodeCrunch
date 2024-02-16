"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { Loader } from "lucide-react";

export default function SignOutButton() {
  const [loading, setLoading] = useState(false);
  const setSignOut = () => {
    setLoading(true);
    signOut();
  };
  return (
    <Button
      onClick={setSignOut}
      type="submit"
      variant="default"
      className="w-full"
      disabled={loading}
    >
      {loading ? <Loader className="w-6 h-6 animate-spin" /> : "Logout"}
    </Button>
  );
}
