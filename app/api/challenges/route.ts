import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { Level, Categories } from "../../../generated/prisma/enums";

export async function POST(req: Request) {
  try {
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

    if (
      !title ||
      !description ||
      !subtitle ||
      !days ||
      !rewardPoints ||
      !category ||
      !level ||
      !goals.length ||
      !images.length
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // 2. check reward points and days is it number
    if (isNaN(Number(rewardPoints)) || Number(rewardPoints) <= 0) {
      return NextResponse.json(
        {
          error: "reward points is not valid",
        },
        { status: 400 },
      );
    }
    if (isNaN(Number(days)) || Number(days) <= 0) {
      return NextResponse.json(
        {
          error: "days is not valid",
        },
        { status: 400 },
      );
    }

    // 3. check title, description and subtitle is it string
    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof subtitle !== "string"
    ) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // 4. upload img into cloudinary
    const uploadedUrls: string[] = [];

    for (const img of images) {
      // convert file to base64
      const bytes = await img.arrayBuffer();
      const base64 = Buffer.from(bytes).toString("base64");
      const dataUri = `data:${img.type};base64,${base64}`;

      // send to cloudinary
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "challenges",
      });

      // save the url
      uploadedUrls.push(result.secure_url);
    }

    // 5. active
    const endDate = new Date();
    // getDate() get just the day number,   new Date() -> March 19, 2026 . with getDate() -> 19
    const date = endDate.getDate() + Number(days); // if days = 30
    // setDate() combine calculus inside into regular date,  converts to April 19
    endDate.setDate(date);

    const active = new Date() < endDate;

    // 6. send res
    const createChallenge = await prisma.challenge.create({
      data: {
        title: title.trim(),
        subtitle: subtitle.trim(),
        description: description.trim(),
        days: Number(days),
        level: level as Level,
        category: category as Categories,
        rewardPoints: Number(rewardPoints),
        goals: goals,
        imgs: uploadedUrls,
        active: active,
      },
      include: {
        workouts: true,
        userChallenges: true,
      },
    });

    return NextResponse.json(createChallenge, { status: 201 });
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

const items_per_page = 6;

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = Number(searchParams.get("page") || "1");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const status = searchParams.get("status") || undefined;
    const level = searchParams.get("level") || "";

    if (page < 1) {
      return NextResponse.json(
        { error: "page number is not valid" },
        { status: 400 },
      );
    }

    const offset = (page - 1) * items_per_page;

    // create empty condition object to use it in count() and findMany()
    const whereCondition: {
      category?: Categories;
      title?: { contains: string; mode: "insensitive" };
      active?: boolean;
      level?: Level;
    } = {};

    if (category !== "") {
      whereCondition.category = category as Categories;
    }

    if (search !== "") {
      whereCondition.title = { contains: search, mode: "insensitive" };
    }

    if (status !== undefined && status !== "") {
      whereCondition.active = status === "true";
    }

    if (level !== "") {
      whereCondition.level = level as Level;
    }

    // count all challenges with conditions
    const totalChallenges = await prisma.challenge.count({
      where: whereCondition,
    });

    const getChallenges = await prisma.challenge.findMany({
      orderBy: {
        id: "desc",
      },
      where: whereCondition,
      skip: offset,
      take: items_per_page,
    });

    const totalPages = Math.ceil(totalChallenges / items_per_page);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return NextResponse.json(
      {
        data: getChallenges,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          hasNextPage: hasNext,
          hasPrevPage: hasPrev,
          totalItems: totalChallenges,
          offset: offset,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
