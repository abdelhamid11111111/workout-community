import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { auth } from "./lib/auth";

export const runtime = "nodejs";

export async function middleware(req: NextRequest) {
  
  const sessionCookie = getSessionCookie(req);
  const pathname = req.nextUrl.pathname;

  if (!sessionCookie) {
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Extra check: for /admin routes, the cookie isn't enough — verify the role.
  if (pathname.startsWith("/admin")) {
    const session = await auth.api.getSession({ headers: req.headers });
    if (session?.user.role !== "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/mychallenges/:path*",
    "/workout/:path*",
    "/admin/:path+", // + instead of * : requires at least one segment after /admin, so bare /admin is NOT matched
  ],
};