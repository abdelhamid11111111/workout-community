import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { auth } from "./lib/auth";

export const runtime = "nodejs";

export async function middleware(req: NextRequest) {
  
  const sessionCookie = getSessionCookie(req);
  const pathname = req.nextUrl.pathname;
  const isApiRoute = pathname.startsWith("/api/");

  const deny = (status: number) =>
    isApiRoute
      ? NextResponse.json({ error: "Unauthorized" }, { status })
      : NextResponse.redirect(
          new URL(pathname.startsWith("/admin") ? "/admin" : "/sign-in", req.url)
        );

  if (!sessionCookie) {
    return deny(401);
  }

  // Extra check: for /admin routes (pages and API), the cookie isn't enough — verify the role.
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const session = await auth.api.getSession({ headers: req.headers });
    if (session?.user.role !== "admin") {
      return deny(403);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/mychallenges/:path*",
    "/workout/:path*",
    "/admin/:path+", // + instead of * : requires at least one segment after /admin, so bare /admin is NOT matched
    "/api/admin/:path*", // protect every admin API route the same way as the admin pages
  ],
};