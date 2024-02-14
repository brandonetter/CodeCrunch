"use client";

import { useCodeStore } from "@/context";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import { PlayCircle, Loader } from "lucide-react";

export default function RunButton(props: any) {
  const params = useParams();

  const { executeCode, loading } = useCodeStore();
  const run = async () => {
    executeCode(params.challenge as string);
  };
  return (
    <div {...props}>
      <Button
        disabled={loading}
        className=" rounded-2xl flex gap-2"
        onClick={run}
      >
        {loading ? (
          <Loader className="animate-spin" size={20} />
        ) : (
          <PlayCircle size={20} />
        )}
        Run Code
      </Button>
    </div>
  );
}
