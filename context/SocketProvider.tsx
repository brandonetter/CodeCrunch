"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import useSockets from "@/lib/hooks/useSockets";

interface SocketContextType {
  isConnected: boolean;
  activeUserList: string[];
  latestRuns: any[];
}

const SocketContext = createContext<SocketContextType>({} as SocketContextType);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { isConnected, activeUserList, latestRuns } = useSockets();

  return (
    <SocketContext.Provider
      value={{
        latestRuns,
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
