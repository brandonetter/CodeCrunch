"use client";
import { useSocketContext } from "@/context/SocketProvider";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Flame, Loader } from "lucide-react";
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
      <div className="relative h-80 mask2 flex flex-col gap-y-1">
        <h1>Latest Victories</h1>
        {latestPointTransactions.map((pointTransaction, i) => (
          <motion.div
            layoutId={pointTransaction}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            key={pointTransaction.id}
            className="flex justify-between bg-card select-none h-[60px] hover:bg-opacity-80 w-full py-2 px-3  rounded-xl text-black shadow-md"
          >
            <div className="flex gap-4 text-gray-400 text-2xl justify-center items-center ">
              <span className="h-full justify-between uppercase flex flex-col">
                <UserIconById
                  id={pointTransaction.userId}
                  username={pointTransaction.userName}
                  className="size-10 shrink-0"
                />
              </span>
              <div className="flex flex-col justify-center h-16">
                <span className="font-bold text-sm text-gray-500">
                  {pointTransaction.reason}
                </span>
                <Link
                  className="hover:underline text-yellow-600 font-mono  flex items-center justify-start"
                  href={`/challenge/${pointTransaction.challengeName}`}
                >
                  <span className="text-lg">
                    {pointTransaction.challengeName}
                  </span>
                </Link>
              </div>
            </div>
            <span className="text-yellow-600 font-mono text-3xl w-1/3 h-16 self-center flex items-center justify-end">
              +{pointTransaction.points}
              <Flame size={30} className="text-yellow-500" />
            </span>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
}
