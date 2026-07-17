import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  
  const challengesOfUser = await prisma.userChallenge.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      joinedAt: "desc",
    },
    include: {
      challenge: {
        include: { // include means fetch data from other table
          _count: {
            select: {
            workouts: { where: { userId: session.user.id } }, 
          },
          },
        },
      },
      user: true,
    },
  });

  const result = challengesOfUser.map((uc) => {
    const workoutCount = uc.challenge._count.workouts;
    const isCompleted = workoutCount >= Number(uc.challenge.days);
    const isActive = !isCompleted;

    return {
      ...uc,
      workoutCount,
      isCompleted,
      isActive
    };
  });


  return NextResponse.json(result, { status: 200 });
}
