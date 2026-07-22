import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { Level } from "@/generated/prisma/enums";

const items_per_page = 8;

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = Number(searchParams.get("page") || "1");
    const search = searchParams.get("search") || "";
    const level = searchParams.get("level") || "";

    const where = {
      name: { contains: search, mode: "insensitive" as const },
      ...(level ? { currentLevel: level as Level } : {}),
    };

    const totalItems = await prisma.user.count({
      where,
    });

    const offset = (page - 1) * items_per_page;

    const totalPages = Math.ceil(totalItems / items_per_page);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    const Users = await prisma.user.findMany({
      where,
      include: { _count: { select: { workouts: true, challenges: true } } },
      orderBy: {
        workouts: {
          _count: "desc",
        },
      },
      skip: offset,
      take: items_per_page,
    });

    return NextResponse.json(
      {
        data: Users,
        pagination: {
          totalItems: totalItems,
          totalPages: totalPages,
          offset: offset,
          hasNextPage: hasNextPage,
          hasPrevPage: hasPrevPage,
          currentPage: page,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("server error", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
