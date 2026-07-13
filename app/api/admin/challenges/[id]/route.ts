import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { Level, Categories } from "../../../../../generated/prisma/enums";
import { auth } from "@/lib/auth";



async function requireAdmin(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}




export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
    const authError = await requireAdmin(req);
  if (authError) return authError;

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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
    const authError = await requireAdmin(req);
  if (authError) return authError;

  try {
    const { id } = await params;

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const subtitle = formData.get("subtitle") as string;
    const days = formData.get("days") as string;
    const rewardPoints = formData.get("rewardPoints") as string;
    const category = formData.get("category") as string;
    const level = formData.get("level") as string;
    const goals = formData.getAll("goals[]") as string[];

    // files uploaded in this request (new files to upload)
    const images = formData.getAll("images[]") as File[];

    // existing image URLs sent from client to keep
    const existingImages = formData.getAll("existingImages[]") as string[];

    // validate required fields (you can relax this if some fields are optional)
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    // 1. upload any new files to Cloudinary
    const uploadedUrls: string[] = [];
    for (const img of images) {
      if (!(img instanceof File)) continue;
      const bytes = await img.arrayBuffer();
      const base64 = Buffer.from(bytes).toString("base64");
      const dataUri = `data:${img.type};base64,${base64}`;
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "challenges",
      });
      uploadedUrls.push(result.secure_url);
    }

    // 2. combine existing urls (from client) with newly uploaded ones
    const combined = [...(existingImages ?? []), ...uploadedUrls].slice(0, 3);

    // 3. prepare update object
    const updateData: Record<string, unknown> = {
      imgs: combined,
      updatedAt: new Date(),
    };

    if (title) updateData.title = title.trim();
    if (subtitle) updateData.subtitle = subtitle.trim();
    if (description) updateData.description = description.trim();
    if (days) updateData.days = Number(days);
    if (rewardPoints) updateData.rewardPoints = Number(rewardPoints);
    if (category) updateData.category = category as Categories;
    if (level) updateData.level = level as Level;
    if (goals && goals.length) updateData.goals = goals;

    // 4. perform update
    const updated = await prisma.challenge.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
    const authError = await requireAdmin(req);
  if (authError) return authError;

  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    console.log("Attempting to delete challenge with id:", id);

    const deleted = await prisma.challenge.delete({
      where: { id: id },
    });

    console.log("Challenge deleted successfully:", deleted.id);

    return NextResponse.json(
      { message: "Challenge deleted successfully", id: deleted.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE error:", error);
    
    // Handle record not found error
    if (error instanceof Error && error.message.includes("not found")) {
      return NextResponse.json(
        { error: "Challenge not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ error: "Failed to delete challenge" }, { status: 500 });
  }
}
