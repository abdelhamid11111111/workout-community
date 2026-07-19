import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";



export async function GET(){
    try{
        
    } catch(error){
        console.error('server error ', error);
        return NextResponse.json({error: 'server error'}, {status: 500})
    }
}