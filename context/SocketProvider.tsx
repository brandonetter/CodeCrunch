"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import useSockets from "@/lib/hooks/useSockets";

interface SocketContextType {
  isConnected: boolean;
  activeUserList: string[];
  latestRuns: any[];
  latestPointTransactions: any[];
}

const SocketContext = createContext<SocketContextType>({} as SocketContextType);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { isConnected, activeUserList, latestRuns, latestPointTransactions } =
    useSockets();

  return (
    <SocketContext.Provider
      value={{
        latestRuns,
        latestPointTransactions,
        isConnected,
        activeUserList,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocketContext() {
  return useContext(SocketContext);
}
