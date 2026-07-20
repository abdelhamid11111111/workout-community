import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    
    const totalBad = await prisma.workout.count({where: {feel: 'Bad'}})
    const totalVeryBad = await prisma.workout.count({where: {feel: 'VeryBad'}})
    const totalNeutral = await prisma.workout.count({where: {feel: 'Neutral'}})
    const totalGood = await prisma.workout.count({where: {feel: 'Good'}})
    const totalVeryGood = await prisma.workout.count({where: {feel: 'VeryGood'}})

    return NextResponse.json({totalBad, totalVeryBad, totalNeutral, totalGood, totalVeryGood}, {status: 200})

    
  } catch (error) {
    console.error("server error", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
