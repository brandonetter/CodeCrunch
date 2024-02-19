import { Server } from "socket.io";
import { getSession } from "next-auth/react";
import { createClient } from "@supabase/supabase-js";
import prisma from "@/lib/prisma";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_KEY
);

export default async function SocketHandler(req, res) {
  if (res.socket.server.io && process.env.NODE_ENV !== "development") {
    console.log("Socket is already running");
    res.end();
  } else {
    // Global State
    console.log("Socket is initializing");
    const io = new Server(res.socket.server, { addTrailingSlash: false });
    res.socket.server.io = io;
    const userMap = new Map();

    // Directly use supabase to listen to changes
    // instead of prisma
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
        },
        async (payload) => {
          switch (payload.table) {
            case "ChallengeRun":
              // fetch the user from the database

              // for each user in the userMap, send a message
              userMap.forEach((_, socket) => {
                io.to(socket.id).emit("newRun", payload.new);
              });
              break;
            case "PointTransaction":
              userMap.forEach((_, socket) => {
                io.to(socket.id).emit("newPoints", payload.new);
              });
              break;
          }
        }
      )
      .subscribe();

    io.on("connection", async (socket) => {
      const session = await getSession({ req });
      if (session) {
        userMap.set(socket, { id: socket.id, email: session.user.email });
      }
      const latestRuns = await prisma.challengeRun.findMany({
        take: 5,
        orderBy: {
          created_at: "desc",
        },
        include: {
          User: true,
          Challenge: true,
        },
      });
      const filteredRun = latestRuns.map((run) => {
        const { User, Challenge, ...rest } = run;
        return {
          ...rest,
          user: User,
          challenge: Challenge,
        };
      });

      socket.emit("latestRuns", filteredRun);

      const latestPoints = await prisma.pointTransaction.findMany({
        take: 5,
        orderBy: {
          created_at: "desc",
        },
      });

      socket.emit("latestPoints", latestPoints);
    });
    res.end();
  }
}
