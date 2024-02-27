import { withAuth } from "next-auth/middleware";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

type Token = {
  role: string;
};

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req) {},
  {
    callbacks: {
      authorized: async ({ req }) => {
        const token = getToken({ req }) as Token;
        return token.role === "admin";
      },
    },
  }
);
// match any route
export const config = { matcher: ["/admin"] };

const getToken = ({ req }: { req: NextRequest }) =>
  jwt.decode(req.cookies.get("next-auth.session-token")!.value);
