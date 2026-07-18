import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id;

    const Challenges = prisma.userChallenge.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
        challenge: true,
      },
    }); 

    const rewardPointsArray = (await Challenges)
       // get challenges who has rewards points 
      .filter((uc) => uc.challenge.rewardPoints)
       // return array of reward points
      .map((uc) => uc.challenge.rewardPoints); 
    const totalRewardPoints = rewardPointsArray.reduce((acc, current) => {
      return acc + current;
    }, 0);

    const workouts = prisma.workout.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
      },
    });

    const caloriesBurnedArray = (await workouts)
      .filter((wo) => wo?.caloriesBurned)
      .map((wo) => wo?.caloriesBurned);
    const totalCaloriesBurned = caloriesBurnedArray.reduce((acc, current) => {
      return (acc ?? 0) + (current ?? 0);
    }, 0);

    return NextResponse.json({ totalRewardPoints, totalCaloriesBurned }, { status: 200 });
  } catch (error) {
    console.error("server error ", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
