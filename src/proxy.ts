import authConfig from "./auth.config";
import NextAuth from "next-auth";

// We use the lightweight auth configuration for the Proxy (Middleware)
// to avoid importing database drivers (like 'pg') which are incompatible with the Edge Runtime.
const { auth } = NextAuth(authConfig);
export const proxy = auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|earth.mp4|.*\\.png|.*\\.jpg).*)"],
};
