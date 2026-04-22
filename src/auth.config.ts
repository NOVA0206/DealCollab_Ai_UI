import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

// This config is used by the Middleware (Proxy) and must NOT include database adapters
// because those often use Node.js-only modules like 'pg' or 'net'.
export default {
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname !== "/" && nextUrl.pathname !== "/welcome";
      
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect to login
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/home", nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
