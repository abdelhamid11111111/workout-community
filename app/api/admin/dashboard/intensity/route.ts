import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const totalWorkout = await prisma.workout.count();

    const workouts = await prisma.workout.findMany({
      select: {
        intensityLevel: true,
      },
    });

    const countIntensity: Record<string, number> = {};

    for (const workout of workouts) {
      const intensity = workout.intensityLevel;
      // save the number of appearances beside its name   // look for intensity inside countIntensity object and return undefined or Number of appearances
      countIntensity[intensity] = (countIntensity[intensity] ?? 0) + 1;
      // writing                  // reading                   
    }

    return NextResponse.json({ totalWorkout, countIntensity }, { status: 200 });
  } catch (error) {
    console.error("server error", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
