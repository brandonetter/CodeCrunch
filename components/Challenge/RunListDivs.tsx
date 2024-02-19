import { useCodeStore, useUserStore } from "@/context";
import { getChallengeRuns } from "@/lib/actions/challengeruns.actions";
import { ChallengeRun } from "@prisma/client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef, useTransition } from "react";
import { Button } from "../ui/button";
import { uuid } from "uuidv4";
import { useOptimistic } from "react";
import { Loader } from "lucide-react";

interface ChallengeRunLoader extends ChallengeRun {
  new?: boolean;
}

export default function RunListDivs({ challengeId }: { challengeId: number }) {
  const { loading, setCode } = useCodeStore();
  const { user } = useUserStore();
  const [runs, setRuns] = useState<ChallengeRun[]>([]);
  const [, startTransition] = useTransition();
  const [optimisticRuns, setOptimisticRuns] = useOptimistic(
    runs,
    (currentRuns: ChallengeRunLoader[], optimisticRun: ChallengeRun) => {
      return [optimisticRun, ...currentRuns];
    }
  );

  const [hasMounted, setHasMounted] = useState(false);
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const addOptimisticRun = () => {
      const optimisticRun = {
        id: uuid(),
        result: "loading",
        time: 0,
        code: "",
        created_at: new Date().toISOString(),
      };
      setOptimisticRuns(optimisticRun as unknown as ChallengeRun);
    };
    if (!user) return;
    if (loading && isMountedRef.current)
      return startTransition(addOptimisticRun);
    async function getChallenges() {
      console.log("run");
      const fetchedRuns = (await getChallengeRuns(
        user.id,
        challengeId
      )) as ChallengeRunLoader[];
      if (fetchedRuns.length) fetchedRuns[0].new = true;
      if (isMountedRef.current) {
        setRuns(fetchedRuns);
        setHasMounted(true);
      }
    }

    getChallenges();
  }, [loading, user]);

  if (!user) {
    return null;
  }
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
      {optimisticRuns.map((run, i) => (
        // Don't be afraid of the magic numbers here, they are just for the animation
        // and they won't cause any responsive issues, they're only vertical.
        <motion.div
          initial={
            run.new ? { opacity: 0, y: 0 } : { opacity: 0, y: -10 + i * 65 }
          }
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
          className="select-none h-[60px] hover:bg-opacity-80 absolute w-full bg-gray-800 py-2 px-3  rounded-xl text-black shadow-md"
        >
          {run.result === "loading" ? (
            <span className="text-gray-400 text-sm animate-pulse h-16 self-center">
              <Loader size={45} className="animate-spin" />
            </span>
          ) : (
            <>
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
            </>
          )}
        </motion.div>
      ))}
    </div>
  );
}
