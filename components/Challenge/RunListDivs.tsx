import { useCodeStore, useUserStore } from "@/context";
import { getChallengeRuns } from "@/lib/actions/challengeruns.actions";
import { ChallengeRun } from "@prisma/client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

export default function RunListDivs({ challengeId }: { challengeId: number }) {
  const { loading, setCode } = useCodeStore();
  const [runs, setRuns] = useState<ChallengeRun[]>([]);
  const [hasMounted, setHasMounted] = useState(false);
  const { user } = useUserStore();

  // will run when the code loading state changes
  // which means the user has ran their code.
  useEffect(() => {
    if (loading || !user) return;
    async function getChallenges() {
      const runs = await getChallengeRuns(user.id, challengeId);
      setRuns(runs);
      if (!hasMounted) setHasMounted(true);
    }
    getChallenges();
  }, [loading, user, challengeId, hasMounted]);

  if (!hasMounted)
    return (
      <div className="relative mask1 h-52 flex flex-col gap-1.5">
        <h2>Latest Runs</h2>
        <div className="h-14 shrink-0 animate-pulse select-none hover:bg-opacity-80  w-full bg-gray-800 py-2 px-3  rounded-xl text-black shadow-md"></div>
        <div className="h-14 shrink-0 animate-pulse select-none hover:bg-opacity-80  w-full bg-gray-800 py-2 px-3  rounded-xl text-black shadow-md"></div>
        <div className="h-14  shrink-0 animate-pulse select-none hover:bg-opacity-80  w-full bg-gray-800 py-2 px-3  rounded-xl text-black shadow-md"></div>
      </div>
    );
  if (!runs.length && hasMounted)
    return (
      <div className="relative">
        <h2>Latest Runs</h2>
        <div className="text-gray-400">No runs yet</div>
      </div>
    );

  return (
    <div className="relative mask2 h-96">
      <h2>Latest Runs</h2>
      {runs.map((run, i) => (
        // Don't be afraid of the magic numbers here, they are just for the animation
        // and they won't cause any responsive issues, they're only vertical.
        <motion.div
          initial={{ opacity: 0, y: -10 + i * 65 }}
          animate={{
            opacity: i <= 4 ? 1 : 0,
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
          className="select-none hover:bg-opacity-80 absolute w-full bg-gray-800 py-2 px-3  rounded-xl text-black shadow-md"
        >
          <div className=" flex justify-between items-center ">
            <span
              className={`${
                run.result === "pass" ? "text-green-400" : "text-red-400"
              } text-md uppercase`}
            >
              {run.result}
            </span>
            <span className="text-gray-400 text-sm">{run.time}ms</span>
          </div>
          <div className="text-gray-500 text-sm flex justify-between items-center">
            <span>{new Date(run.created_at).toLocaleTimeString()}</span>
            <Button
              className="h-2 rounded-[4px]"
              onClick={() => {
                setCode(run?.code!);
              }}
            >
              View
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
