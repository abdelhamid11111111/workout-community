import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const items_per_page = 5;

export async function GET(req: NextRequest) {
  try {
    // extract values
    const searchParams = req.nextUrl.searchParams;
    const page = Number(searchParams.get("page") || "1");
    const search = searchParams.get("search") || "";

    if (page < 1) {
      return NextResponse.json(
        { error: "page number is not valid" },
        { status: 400 },
      );
    }

    // count all challenges we should skip
    const offset = (page - 1) * items_per_page;

    // count challenges with with filtering
    const totalItems = await prisma.challenge.count({
      where: {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
    });
    // get challenges data with same filter to match the quantity above
    const challenges = await prisma.challenge.findMany({
      where: {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      orderBy: {
        userChallenges: {
          _count: 'desc'
        }
      },
      include: {
        userChallenges: true
      },
      take: items_per_page,
      skip: offset,
    });

    // simple calculus for pagination
    const totalPages = Math.ceil(totalItems / items_per_page);
    const hasNextPage = totalPages > page;
    const hasPrevPage = page > 1;

    // send res
    return NextResponse.json(
      {
        data: challenges,
        pagination: {
          currentPage: page,
          hasNextPage: hasNextPage,
          hasPrevPage: hasPrevPage,
          offset: offset,
          totalItems: totalItems,
          totalPages: totalPages,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("server error", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
