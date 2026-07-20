import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const totalUser = await prisma.user.count();

    const totalUserWithWorkoutTime = await prisma.user.findMany({
      select: {
        workoutTime: true,
      },
    });

    const countTimes: Record<string, number> = {};

    for (const workoutTime of totalUserWithWorkoutTime) {
      const time = workoutTime.workoutTime;
      if (time !== null) {
        countTimes[time] = (countTimes[time] ?? 0) + 1;
      }
    }

    return NextResponse.json({countTimes, totalUser}, {status: 200})

  } catch (error) {
    console.error("server error ", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
