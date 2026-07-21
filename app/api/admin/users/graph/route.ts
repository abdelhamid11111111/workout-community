import { NextResponse } from "next/server";
import { getUserSignupsThisWeek } from "@/lib/queries/getUserSignups";

export async function GET() {
  try {
    const signupData = await getUserSignupsThisWeek();
    return NextResponse.json(signupData, { status: 200 });
  } catch (error) {
    console.error("server error", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}