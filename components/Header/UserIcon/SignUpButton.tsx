"use client";

import { lazy } from "react";
import { Button } from "@/components/ui/button";
import { usePopupStore } from "@/context";

const SignInSignUp = lazy(() => import("../../Popup/SignInSignUp"));

export default function SignUpButton() {
  const { setOpen, setComponent } = usePopupStore();
  const openPopup = () => {
    setComponent(SignInSignUp);
    setOpen(true);
  };
  return (
    <Button
      onClick={openPopup}
      variant="outline"
      className="rounded-xl px-4 flex flex-shrink-0 "
    >
      Sign In
    </Button>
  );
}
