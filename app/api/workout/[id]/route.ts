import { NextResponse, NextRequest } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const {id} = await params

    const session = await auth.api.getSession({headers: await headers()})
    const userId = session?.user?.id
    const body = await req.json()
    const {duration, burnedCalories, selectedFeel, selectedIntensity} = body

    if(!userId){
      return NextResponse.json({error: 'Unauthorized: user not found'}, {status: 401})
    }

    if(!duration || !burnedCalories || !selectedFeel || !selectedIntensity){
      return NextResponse.json({error: 'Missing required fields'}, {status: 400})
    }

    if(isNaN(duration) || duration < 0){
      return NextResponse.json({error: 'Invalid duration: must be a positive number.'}, {status: 400})
    }
    if(isNaN(burnedCalories) || burnedCalories < 0 ){
      return NextResponse.json({error: 'Invalid burn Calories: must be a positive number.'}, {status: 400})
    }

    const addWorkOut = await prisma.workout.create({
      data: {
        duration: duration,
        challengeId: id,
        userId: userId,
        caloriesBurned: burnedCalories,
        intensityLevel: selectedIntensity,
        feel: selectedFeel,
        loggedAt: new Date()
      },
      include: {
        challenge: true
      }
    })

    return NextResponse.json({success: true, workout: addWorkOut}, {status: 201})
    

  } catch (error) {
    console.error("server error", error);
  }
}
