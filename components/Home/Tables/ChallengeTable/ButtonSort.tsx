"use client";
import { Button } from "@/components/ui/button";
import { updateURL } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";

import React from "react";

export const ButtonSort = ({ name }: { name: string }) => {
  const params = useSearchParams();
  const router = useRouter();
  const isAscending = params.get("asc") === name ? name : "";

  const toggleSorting = (column: string) => {
    if (isAscending === column) {
      updateURL(params, { asc: "", desc: column }, router);
    } else {
      updateURL(params, { asc: column, desc: "" }, router);
    }
  };

  return (
    <Button
      variant="ghost"
      className="p-0 flex gap-1"
      onClick={() => toggleSorting(name)}
    >
      {name}
      <span className="flex justify-center items-center tracking-[-3px] text-black/50">
        ⬆⬇
      </span>
    </Button>
  );
};

ButtonSort.displayName = "ButtonSort";
