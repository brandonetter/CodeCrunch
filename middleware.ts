import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // console.log(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (!token) {
          return false;
        }
        return token.role === "admin";
      },
    },
  }
);

export const config = { matcher: ["/admin"] };
