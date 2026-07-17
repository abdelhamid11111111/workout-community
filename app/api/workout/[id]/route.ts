import { NextResponse, NextRequest } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id;
    const body = await req.json();
    const { duration, burnedCalories, selectedFeel, selectedIntensity } = body;

    const durationNum = Number(duration);
    const burnedCaloriesNum = Number(burnedCalories);

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized: user not found" },
        { status: 401 },
      );
    }

    if (
      !durationNum ||
      !burnedCalories ||
      !selectedFeel ||
      !selectedIntensity
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (isNaN(durationNum) || durationNum < 0) {
      return NextResponse.json(
        { error: "Invalid duration: must be a positive number." },
        { status: 400 },
      );
    }
    if (isNaN(burnedCaloriesNum) || burnedCaloriesNum < 0) {
      return NextResponse.json(
        { error: "Invalid burn Calories: must be a positive number." },
        { status: 400 },
      );
    }

    const addWorkOut = await prisma.workout.create({
      data: {
        duration: durationNum,
        challengeId: id,
        userId: userId,
        caloriesBurned: burnedCaloriesNum,
        intensityLevel: selectedIntensity,
        feel: selectedFeel,
        loggedAt: new Date(),
      },
      include: {
        challenge: true,
      },
    });

    return NextResponse.json(
      { success: true, workout: addWorkOut },
      { status: 201 },
    );
  } catch (error) {
    console.error("server error", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}


export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized: user not found" }, { status: 401 });
    }

    const workouts = await prisma.workout.findMany({
      where: {
        challengeId: id,
        userId: userId,
      },
      select: {
        loggedAt: true,
      },
      orderBy: {
        loggedAt: "desc",
      },
    });

    // Collect the distinct calendar days a workout was logged on (UTC date-only, "YYYY-MM-DD")
    const loggedDays = new Set(
      workouts.map((w) => new Date(w.loggedAt).toISOString().slice(0, 10)),
    );

    // Walk backward day-by-day from today counting an unbroken run of logged days.
    // If today has no workout yet, start from yesterday so the streak isn't
    // wrongly broken just because the user hasn't logged today's workout yet.
    let currentStreak = 0;
    const cursor = new Date();
    cursor.setUTCHours(0, 0, 0, 0);

    if (!loggedDays.has(cursor.toISOString().slice(0, 10))) {
      cursor.setUTCDate(cursor.getUTCDate() - 1);
    }

    while (loggedDays.has(cursor.toISOString().slice(0, 10))) {
      currentStreak++;
      cursor.setUTCDate(cursor.getUTCDate() - 1);
    }

    return NextResponse.json(
      { countWorkout: workouts.length, currentStreak },
      { status: 200 },
    );
  } catch (error) {
    {
      console.error("server error", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 },
      );
    }
  }
}

export async function DELETE(req: NextRequest, {params}: {params: Promise<{id: string}>}){
  try{
    const {id} = await params

    const session = await auth.api.getSession({headers: await headers()})
    const userId = session?.user?.id

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized: user not found" },
        { status: 401 },
      );
    }

    await prisma.$transaction([
      prisma.workout.deleteMany({
        where: {
          userId: userId,
          challengeId: id,
        },
      }),
      prisma.userChallenge.delete({
        where: {
          userId_challengeId: {
            userId: userId,
            challengeId: id,
          },
        },
      }),
    ]);

    return NextResponse.json(
      { success: true },
      { status: 200 },
    );
  } catch(error){
    console.error('server error ', error);
    return NextResponse.json({error: 'server error'}, {status: 500})
  }
}