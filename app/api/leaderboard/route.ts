import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { Level } from "@/generated/prisma/enums";

const items_per_page = 8;

// Public leaderboard endpoint — intentionally does NOT require auth,
// this page is meant to be visible to everyone. Unlike
// /api/admin/users/table (which requires an admin session and returns
// every column including email/passwordHash/ban status), this route
// explicitly selects only the fields that are safe to show publicly.
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

    const totalItems = await prisma.user.count({ where });

    const offset = (page - 1) * items_per_page;
    const totalPages = Math.ceil(totalItems / items_per_page);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        profilePic: true,
        currentLevel: true,
        _count: { select: { workouts: true, challenges: true } },
      },
      orderBy: {
        workouts: { _count: "desc" },
      },
      skip: offset,
      take: items_per_page,
    });

    return NextResponse.json(
      {
        data: users,
        pagination: {
          totalItems,
          totalPages,
          offset,
          hasNextPage,
          hasPrevPage,
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
