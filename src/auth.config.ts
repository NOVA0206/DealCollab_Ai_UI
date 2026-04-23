import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { db } from "./db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";

export default {
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      id: "credentials",
      name: "Phone OTP",
      credentials: {
        phone: { label: "Phone", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.phone) return null;
        
        // Find the user by verified phone number
        const user = await db.query.users.findFirst({
          where: eq(users.phone, credentials.phone as string),
        });

        if (user && user.isPhoneVerified) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isPhoneVerified: user.isPhoneVerified,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname !== "/" && nextUrl.pathname !== "/welcome";
      
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect to login
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
