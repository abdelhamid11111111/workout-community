import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ title: string }> },
) {
  try {
    const { title } = await params;
    const challenge = await prisma.challenge.findFirst({
      where: {
        title: title,
      },
      include: {
        userChallenges: true,
      },
    });

    const totalUsr = challenge?.userChallenges.length ?? 0;

    return NextResponse.json(
      {
        challenge,
        totalUsr,
        goals: challenge?.goals ?? [],
        imgs: challenge?.imgs ?? [],
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
