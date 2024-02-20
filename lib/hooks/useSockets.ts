"use client";

import io, { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { ChallengeRun } from "@prisma/client";

interface RunDisplay extends ChallengeRun {
  user: {
    email: string;
    id: string;
  };
}

const useSockets = () => {
  const [socket, setSocket] = useState<Socket>();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [activeUserList, setActiveUserList] = useState<string[]>([]);
  const [latestRuns, setLatestRuns] = useState<RunDisplay[]>([]);
  const [latestPointTransactions, setLatestPointTransactions] = useState<any[]>(
    []
  );

  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/socket_io");
      const socketConnection = io({
        addTrailingSlash: false,
      });
      setSocket(socketConnection);
    };
    socketInitializer();
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("newRun", (message: RunDisplay) => {
      setLatestRuns((prev) => {
        return [message, ...prev];
      });
    });

    socket.on("newPoints", (message: any) => {
      setLatestPointTransactions((prev) => {
        return [message, ...prev];
      });
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
    socket.on("latestRuns", (message: RunDisplay[]) => {
      setLatestRuns(message);
    });

    socket.on("latestPoints", (message: any[]) => {
      setLatestPointTransactions(message);
    });
    socket.on("users", (message: string[]) => {
      console.log("active users", message);
      setActiveUserList(message);
    });
  }, [socket]);

  return {
    isConnected,
    latestRuns,
    activeUserList,
    latestPointTransactions,
  };
};

export default useSockets;
