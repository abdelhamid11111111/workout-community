import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Level, Categories } from "@/generated/prisma/enums";


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
