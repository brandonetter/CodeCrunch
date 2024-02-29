import { useCodeStore, useUserStore } from "@/context";
import { getChallengeRuns } from "@/lib/actions/challengeruns.actions";
import { ChallengeRun } from "@prisma/client";
import { useState, useEffect, useRef, useTransition } from "react";
import { uuid } from "uuidv4";
import { useOptimistic } from "react";

import RunCards from "../shared/RunCards";

import { useSocketContext } from "@/context/SocketProvider";

interface ChallengeRunLoader extends ChallengeRun {
  new?: boolean;
}

export default function RunListDivs({ challengeId }: { challengeId: number }) {
  const { loading, setCode } = useCodeStore();
  const { latestRuns } = useSocketContext();

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
    // mounting logic
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    // set the loader run
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
  }, [loading, user, setOptimisticRuns]);

  useEffect(() => {
    // mount the initial runs
    if (!isMountedRef.current) return;
    if (!user) return;
    async function getChallenges() {
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
  }, [challengeId, user]);

  useEffect(() => {
    // use the sockets to update the runs
    // this is much more efficient than
    // a server action
    if (!latestRuns.length) return;
    if (!user) return;
    const latestRun = latestRuns.filter(
      (run) => run.userId === user.id && run.challengeId === challengeId
    );
    if (latestRun[0]) {
      if (runs.some((run) => run.id === latestRun[0].id)) return;
      latestRun[0].new = true;
      setRuns((prevRuns) => [latestRun[0], ...prevRuns]);
    }
  }, [latestRuns, user, challengeId, runs]);

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
    <div className="relative mask2 h-72 flex flex-col gap-y-1">
      <h2>Latest Runs</h2>
      <RunCards runs={optimisticRuns} page="challenge" />
    </div>
  );
}
