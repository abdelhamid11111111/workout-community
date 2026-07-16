import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;   // ← unwrap the Promise here

  const record = await prisma.userChallenge.findUnique({
    where: {
      userId_challengeId: {
        userId: session.user.id,
        challengeId: id,
      },
    },
  });

  return NextResponse.json(record, { status: 200 });
}