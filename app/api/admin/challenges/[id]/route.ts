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
      include: {
        goals: true,
        images: true,
      },
    });
    return NextResponse.json(fetchChallenge, { status: 200 });
  } catch (error) {
    console.error("Server error: ", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
