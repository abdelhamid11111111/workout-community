import { NextResponse, NextRequest } from "next/server";
import {prisma} from '@/lib/prisma'


export async function GET(){
    try{
        const totalUsers = await prisma.user.count()

        const totalUsersInChall = await prisma.userChallenge.findMany({
            distinct: ['userId'],
            select: {userId: true}
        })
        const totalInChall = totalUsersInChall.length

        const notInChall = totalUsers - totalInChall

        const totalWorkouts = await prisma.workout.count()
        const avgWorkoutPerUsr = totalWorkouts / totalUsers

        return NextResponse.json({totalUsers, totalInChall, notInChall, avgWorkoutPerUsr}, {status: 200})

    } catch(error){
        console.error('server error', error);
        return NextResponse.json({error: 'server error'}, {status: 500})
    }
}