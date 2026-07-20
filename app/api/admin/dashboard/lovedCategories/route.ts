import { NextResponse, NextRequest } from "next/server";
import {prisma} from '@/lib/prisma'


export async function GET(){
    try{

        const joiningChallenges = await prisma.userChallenge.findMany({
            include: {
                challenge: {
                    select: { category: true }
                }
            }
        })
        
        // record user to create object 
        const counts: Record<string, number> = {};   // means every key refer to string and value to number

        for(const j of joiningChallenges) {
            const cat = j.challenge.category;
            counts[cat] = (counts[cat] ?? 0) + 1
        }

        const totalJoiningChallenges = await prisma.userChallenge.count()
        
        return NextResponse.json({counts, totalJoiningChallenges}, {status: 200})
        
    } catch(error){
        console.error('server error', error);
        return NextResponse.json({error: 'server error'}, {status: 500})
    }
}