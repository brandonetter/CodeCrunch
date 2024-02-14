"use client";

import { useCodeStore } from "@/context";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import { runCode } from "@/lib/actions/code";
import { PlayCircle, Loader } from "lucide-react";

import { useTransition } from "react";

export default function RunButton(props: any) {
  const params = useParams();

  const { code, setErrors, setResults } = useCodeStore();
  const [pending, startTransition] = useTransition();
  const run = async () => {
    startTransition(async () => {
      const { stderr, stdout } = await runCode(
        code,
        params.challenge as string
      );
      if (stderr) {
        setErrors(stderr);
        return;
      }
      setResults(stdout);
    });
  };
  return (
    <div {...props}>
      <Button
        disabled={pending}
        className=" rounded-2xl flex gap-2"
        onClick={run}
      >
        {pending ? (
          <Loader className="animate-spin" size={20} />
        ) : (
          <PlayCircle size={20} />
        )}
        Run Code
      </Button>
    </div>
  );
}
