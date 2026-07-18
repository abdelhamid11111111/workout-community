import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";



export async function GET() {
  try {
    const fetchChallenges = await prisma.challenge.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });
    return NextResponse.json(fetchChallenges, { status: 200 });
  } catch (error) {
    console.error("server error: ", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
