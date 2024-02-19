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
    // User State
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
        },
        async (payload) => {
          // fetch the user from the database
          const user = await prisma.user.findUnique({
            where: {
              id: payload.new.userId,
            },
          });
          const challenge = await prisma.challenge.findUnique({
            where: {
              id: payload.new.challengeId,
            },
          });
          // for each user in the userMap, send a message
          userMap.forEach((_, socket) => {
            io.to(socket.id).emit("newRun", {
              user: user,
              run: payload.new,
              challenge,
            });
          });
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
          uh: "a",
          run: rest,
          user: User,
          challenge: Challenge,
        };
      });

      socket.emit("latestRuns", filteredRun);
    });
    res.end();
  }
}
