import { NextResponse, NextRequest } from "next/server";
import {prisma} from '@/lib/prisma'



export async function GET() {
  try {
    const workouts = await prisma.workout.findMany({
      where: {
        caloriesBurned: { not: null },
      },
      select: {
        caloriesBurned: true,
        challenge: {
          select: { category: true },
        },
      },
    });

    // sum + count per category, so we can average afterwards
    const totals: Record<string, number> = {};
    const counts: Record<string, number> = {};

    for (const w of workouts) {
      const cat = w.challenge.category;
      const cal = w.caloriesBurned ?? 0;
      totals[cat] = (totals[cat] ?? 0) + cal;
      counts[cat] = (counts[cat] ?? 0) + 1;
    }

    const avgByCategory: Record<string, number> = {};
    for (const cat of Object.keys(totals)) {
      avgByCategory[cat] = Math.round(totals[cat] / counts[cat]);
    }

    return NextResponse.json({ avgByCategory }, { status: 200 });
  } catch (error) {
    console.error("server error", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}