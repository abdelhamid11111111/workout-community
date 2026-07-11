import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { Level, Categories } from "../../../../../generated/prisma/enums";


export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const fetchChallenge = await prisma.challenge.findUnique({
      where: { id: id },
    });
    return NextResponse.json(fetchChallenge, { status: 200 });
  } catch (error) {
    console.error("server error: ", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }>}){
  try{
    const {id} = await params

     const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const subtitle = formData.get("subtitle") as string;
    const days = formData.get("days") as string;
    const rewardPoints = formData.get("rewardPoints") as string;
    const category = formData.get("category") as string;
    const level = formData.get("level") as string;
    const goals = formData.getAll("goals[]") as string[];
    const images = formData.getAll("images[]") as File[];


  } catch(error){
    console.error('server error: ', error)
    return NextResponse.json({error: 'server error'}, {status: 500})
  }
}