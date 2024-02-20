import { ChallengeRun } from "@prisma/client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import { useCodeStore } from "@/context";
import UserIconById from "./UserIconById";

// todo: refactor this to be cleaner
// and fix types
export default function RunCards({
  runs,
  page,
}: {
  runs: any[];
  page: string;
}) {
  const { setCode } = useCodeStore();

  const motionDivClass = `${
    page === "latestRuns" ? "bg-card" : "bg-gray-800"
  } select-none h-[60px] hover:bg-opacity-80 absolute w-full py-2 px-3  rounded-xl text-black shadow-md`;
  return runs.map((run, i) => (
    <motion.div
      initial={run.new ? { opacity: 0, y: 0 } : { opacity: 0, y: -10 + i * 65 }}
      animate={{
        opacity: 1,
        y: 0 + i * 65,
      }}
      exit={{ opacity: 0, y: 20 + i * 65 }}
      transition={{
        duration: 0.2,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      key={run.id}
      translate="yes"
      className={motionDivClass}
    >
      {run.result === "loading" ? (
        <span className="text-gray-400 text-sm animate-pulse h-16 self-center">
          <Loader size={45} className="animate-spin" />
        </span>
      ) : (
        <div className="flex justify-between gap-2 items-center">
          <div className="flex gap-2">
            {page === "latestRuns" && (
              <span>
                <UserIconById
                  id={run.userId}
                  username={run.userName}
                  className="size-10"
                />
              </span>
            )}
            <div className=" flex flex-col justify-between items-center ">
              <span
                className={`${
                  run.result === "pass" ? "text-green-400" : "text-red-400"
                } text-md uppercase`}
              >
                {run.result}
              </span>
              <span className="text-gray-400 text-sm">{run.time}ms</span>
            </div>
          </div>
          <div className="text-gray-500  text-sm flex flex-col justify-between items-center">
            <div className="flex flex-col content-center items-center">
              {page === "latestRuns" && (
                <Link
                  className="hover:underline text-yellow-600 font-mono  flex items-center justify-start"
                  href={`/challenge/${run.challengeName}`}
                >
                  <span className="text-lg"> {run?.challengeName}</span>
                </Link>
              )}
              <span>{new Date(run.created_at).toLocaleTimeString()}</span>
            </div>
            {page === "challenge" && (
              <Button
                className="h-2 rounded-[4px]"
                onClick={() => {
                  setCode(run?.code!);
                }}
              >
                View
              </Button>
            )}
          </div>
        </div>
      )}
    </motion.div>
  ));
}
