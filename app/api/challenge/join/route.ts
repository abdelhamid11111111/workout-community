import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Prisma } from "@/generated/prisma/client";

export async function POST(req: NextRequest) {
  // get session of user
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { challengeId } = await req.json();
  if (!challengeId) {
    return NextResponse.json({ error: "no challenge found" }, { status: 400 });
  }

  try {
    const userChallenge = await prisma.userChallenge.create({
      data: {
        userId: session.user.id,
        challengeId: challengeId,
      },
    });
    return NextResponse.json(userChallenge, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json({ error: "Already joined" }, { status: 409 });
      }
    }
    console.error({ error: "server error" });
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
