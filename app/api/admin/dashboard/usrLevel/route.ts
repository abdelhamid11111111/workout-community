import { NextResponse, NextRequest } from "next/server";
import {prisma} from '@/lib/prisma'



export async function GET(){
    try{

        const totalUsers = await prisma.user.count()

        const totalUsersLevels = await prisma.user.findMany({
            select: {
                currentLevel: true
            }
        })

        const countLevels: Record<string, number> = {}

        for(const user of totalUsersLevels){
            const level = user.currentLevel
            if(level !== null){
                countLevels[level] = (countLevels[level] ?? 0) + 1
            }
        }

        return NextResponse.json({totalUsers, countLevels}, {status: 200})


    } catch(error){
        console.error('server error'), error;
        return NextResponse.json({error: 'server error'}, {status: 500})
    }
}