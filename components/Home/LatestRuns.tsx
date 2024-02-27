"use client";
import { useSocketContext } from "@/context/SocketProvider";
import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "lucide-react";
import RunCards from "../shared/RunCards";
export default function LatestRuns() {
  const { isConnected, activeUserList, latestRuns } = useSocketContext();

  if (!isConnected || !latestRuns.length) {
    return (
      <div className="h-80   flex flex-col items-start justify-start">
        <h1>Latest Runs</h1>
        <div className="h-full w-full flex items-center justify-center">
          <Loader size="50" className="animate-spin" />
        </div>
      </div>
    );
  }
  return (
    <AnimatePresence>
      <div className="relative h-80 mask2 flex flex-col gap-y-1">
        <h1>Latest Runs</h1>
        <RunCards runs={latestRuns} page="latestRuns" />
      </div>
    </AnimatePresence>
  );
}
