"use client";
import { useSocketContext } from "@/context/SocketProvider";
import { AnimatePresence, motion } from "framer-motion";
export default function LatestRuns() {
  const { isConnected, activeUserList, latestRuns } = useSocketContext();
  console.log(latestRuns);
  return (
    <div className="relative h-96 mask2">
      <h1>Latest Runs</h1>

      <AnimatePresence>
        {latestRuns.map((run, i) => (
          <motion.div
            initial={{ opacity: 0, y: i * 65 - 10 }}
            animate={{ opacity: 1, y: i * 65 }}
            exit={{ opacity: 0 }}
            key={run.run.id}
            className="select-none absolute h-[60px] hover:bg-opacity-80 w-full bg-card py-2 px-3  rounded-xl text-black shadow-md"
          >
            <>
              <div className=" flex justify-between items-center ">
                <span
                  className={`${
                    run.run.result === "pass"
                      ? "text-green-400"
                      : "text-red-400"
                  } text-md uppercase`}
                >
                  {run.run.result}
                </span>
                <span className="text-gray-400 text-sm">{run.run.time}ms</span>
              </div>
              <div className="text-gray-500 text-sm flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <span className="font-bold text-lg tracking-widest">
                    {run.challenge.name}
                  </span>
                  <span>
                    {new Date(run.run.created_at).toLocaleTimeString()}
                  </span>
                </div>
                <span>{run.user.name}</span>
              </div>
            </>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
