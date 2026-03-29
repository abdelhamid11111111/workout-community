import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

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
    });
    return NextResponse.json(challenge, { status: 200 });
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
