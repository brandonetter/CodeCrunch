import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import prisma from "./prisma";
import GithubProvider from "next-auth/providers/github";
import { getServerSession } from "next-auth";
import jwt from "jsonwebtoken";
import { JWTDecodeParams } from "next-auth/jwt";

// extend User to include role
declare module "next-auth" {
  interface User {
    role: string;
  }
  interface Session {
    user: {
      email: string;
      role: string;
      image: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  // use token for session
  session: {
    strategy: "jwt",
  },
  jwt: {
    // custom encode/decode
    // so we can share the token with other services
    async encode({ secret, token, maxAge = 256000 }) {
      const jwtClaims = {
        exp: Date.now() + maxAge * 1000,
        ...token,
      };
      const encodedToken = jwt.sign(jwtClaims, secret, {
        algorithm: "HS512",
      });

      return encodedToken;
    },
    async decode({ secret, token }: JWTDecodeParams): Promise<any> {
      const decodedToken = jwt.verify(token!, secret, {
        algorithms: ["HS512"],
      });
      return decodedToken;
    },
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
    async session({ session, token }) {
      session.user.role = token.role as string;
      return session;
    },
  },
};

export const getSession = async () => await getServerSession(authOptions);
