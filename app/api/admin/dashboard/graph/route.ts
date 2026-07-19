import { NextResponse } from "next/server";
import { getUserJoinsThisWeek } from "../../../../../lib/queries/getUserJoins";

export async function GET() {
  try {
    const joinsData = await getUserJoinsThisWeek();
    return NextResponse.json(joinsData);
  } catch (error) {
    console.error("server error ", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}