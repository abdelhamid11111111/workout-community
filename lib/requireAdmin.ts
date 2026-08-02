
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";
 
/**
 * Call at the top of any /api/admin/* route handler.
 * Returns a 401 response if the caller isn't a signed-in admin, otherwise null.
 *
 * Usage:
 *   const authError = await requireAdmin(req);
 *   if (authError) return authError;
 */
export async function requireAdmin(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
 
