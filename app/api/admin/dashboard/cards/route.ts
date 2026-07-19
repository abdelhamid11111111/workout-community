import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET() {
  try {
    const countChallenges = await prisma.challenge.count();
    const countActiveChallenges = await prisma.userChallenge.findMany({
      distinct: ["challengeId"],
      select: { challengeId: true },
    });
    const activeChallengesCount = countActiveChallenges.length;

    const totalUsers = await prisma.user.count();
    const participants = await prisma.userChallenge.findMany({
      // remove duplication
      distinct: ["userId"],
      select: { userId: true },
    });
    const totalPar = participants.length;

    const totalWorkouts = await prisma.workout.count()

    const workoutArray = await prisma.workout.findMany()
    const caloriesArray = workoutArray.filter(ca => ca.caloriesBurned).map(ca => ca.caloriesBurned)
    const totalCalories = caloriesArray.reduce((acc, current) => {return (acc ?? 0) + (current ?? 0)},0)

    return NextResponse.json({totalUsers, totalPar, countChallenges, totalWorkouts, activeChallengesCount, totalCalories})
  } catch (error) {
    console.error("server error ", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
