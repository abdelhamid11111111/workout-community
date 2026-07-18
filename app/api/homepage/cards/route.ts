import { NextResponse, NextRequest } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const challenges = await prisma.challenge.count();

    const participants = await prisma.userChallenge.findMany({
      // remove duplication
      distinct: ["userId"],
      select: { userId: true },
    });
    const totalPar = participants.length;

    const totalJoins = await prisma.userChallenge.count()

    const totalWorkout = await prisma.workout.count()


    return NextResponse.json({challenges, totalPar, totalJoins, totalWorkout}, {status: 200})
  } catch (error) {
    console.error("server error ", error);
    return NextResponse.json({ error: "server error" }, { status: 400 });
  }
}
