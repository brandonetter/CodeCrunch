"use client";
import { useSocketContext } from "@/context/SocketProvider";
import { AnimatePresence, motion } from "framer-motion";
import { Flame, Loader, Shell } from "lucide-react";
import RunCards from "../shared/RunCards";
import UserIcon from "../Header/UserIcon";
import UserIconById from "../shared/UserIconById";
export default function LatestPoints() {
  const { isConnected, latestPointTransactions } = useSocketContext();

  if (!isConnected || !latestPointTransactions?.length) {
    return (
      <div className="h-80   flex flex-col items-start justify-start">
        <h1>Latest Victories</h1>
        <div className="h-full w-full flex items-center justify-center">
          <Loader size="50" className="animate-spin" />
        </div>
      </div>
    );
  }
  return (
    <AnimatePresence>
      <div className="relative h-80 mask2">
        <h1>Latest Victories</h1>
        {latestPointTransactions.map((pointTransaction, i) => (
          <motion.div
            initial={{ opacity: 0, y: -10 + i * 65 }}
            animate={{
              opacity: 1,
              y: 0 + i * 65,
            }}
            exit={{ opacity: 0, y: 20 + i * 65 }}
            key={pointTransaction.id}
            className="flex justify-between bg-card select-none h-[60px] hover:bg-opacity-80 absolute w-full py-2 px-3  rounded-xl text-black shadow-md"
          >
            <span className="text-gray-400 text-sm h-full justify-between uppercase flex flex-col">
              <UserIconById
                id={pointTransaction.userId}
                username={pointTransaction.userName}
                className="size-10 shrink-0"
              />
              <span>{pointTransaction.userName}</span>
              {pointTransaction.reason}
            </span>
            <span className="text-yellow-600 text-3xl h-16 self-center flex content-center items-center">
              +{pointTransaction.points}
              <Flame size={30} className="text-yellow-500" />
            </span>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
}
