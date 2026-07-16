import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const challengesOfUser = await prisma.userChallenge.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      joinedAt: "desc",
    },
    include: {
      challenge: true,
      user: true
    },
  });
  return NextResponse.json(challengesOfUser, { status: 200 });
}
