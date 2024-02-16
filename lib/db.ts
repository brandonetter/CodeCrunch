import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import prisma from "./prisma";
import GithubProvider from "next-auth/providers/github";
import { getServerSession } from "next-auth";

// extend User to include role
declare module "next-auth" {
  interface User {
    role: string;
  }
}

export const authOptions: NextAuthOptions = {
  // use token for session
  session: {
    strategy: "jwt",
  },

  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
};

export const getSession = () => getServerSession(authOptions);
