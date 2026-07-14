import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import { Level, WorkoutTime, PersonalGoals } from "@/generated/prisma/enums";

const VALID_LEVELS = ["beginner", "intermediate", "advanced"];
const VALID_TIMES = ["Morning", "Afternoon", "Evening", "Night"];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const username = ((formData.get("username") as string) || "").trim();
    const email = ((formData.get("email") as string) || "").trim().toLowerCase();
    const password = formData.get("password") as string;
    const currentLevel = formData.get("currentLevel") as string;
    const workoutTime = formData.get("workoutTime") as string;
    const personalGoals = formData.getAll("personalGoals[]") as string[];
    const profilePic = formData.get("profilePic") as File | null;

    // 1. required fields
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Username, email and password are required" },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 },
      );
    }

    // 2. validate enum-like fields if provided
    if (currentLevel && !VALID_LEVELS.includes(currentLevel)) {
      return NextResponse.json(
        { error: "Invalid fitness level" },
        { status: 400 },
      );
    }

    if (workoutTime && !VALID_TIMES.includes(workoutTime)) {
      return NextResponse.json(
        { error: "Invalid workout time" },
        { status: 400 },
      );
    }

    if (profilePic && profilePic.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Profile picture must be under 5MB" },
        { status: 400 },
      );
    }

    // 3. friendly duplicate check before we touch better-auth
    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
      select: { email: true, username: true },
    });

    if (existing) {
      return NextResponse.json(
        {
          error:
            existing.email === email
              ? "An account with this email already exists"
              : "This username is already taken",
        },
        { status: 409 },
      );
    }

    // 4. create the user + account + session through better-auth
    //    (handles password hashing and issues the session cookie)
    let signUpResponse: Response;
    try {
      signUpResponse = await auth.api.signUpEmail({
        body: { email, password, name: username, username },
        asResponse: true,
      });
    } catch (err) {
      console.error("signUpEmail error", err);
      return NextResponse.json(
        { error: "Could not create account" },
        { status: 400 },
      );
    }

    if (!signUpResponse.ok) {
      const errBody = await signUpResponse.json().catch(() => ({}));
      return NextResponse.json(
        { error: errBody?.message || "Could not create account" },
        { status: signUpResponse.status || 400 },
      );
    }

    const signUpData = await signUpResponse.json();
    const userId = signUpData?.user?.id as string | undefined;

    if (!userId) {
      return NextResponse.json(
        { error: "Could not create account" },
        { status: 500 },
      );
    }

    // 5. upload profile picture if provided
    let profilePicUrl: string | undefined;
    if (profilePic && profilePic.size > 0) {
      try {
        const bytes = await profilePic.arrayBuffer();
        const base64 = Buffer.from(bytes).toString("base64");
        const dataUri = `data:${profilePic.type};base64,${base64}`;

        const result = await cloudinary.uploader.upload(dataUri, {
          folder: "profile-pics",
        });
        profilePicUrl = result.secure_url;
      } catch (err) {
        // don't fail the whole signup just because the image upload failed
        console.error("Cloudinary upload error", err);
      }
    }

    // 6. save the onboarding data onto the freshly created user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        currentLevel: currentLevel ? (currentLevel as Level) : undefined,
        workoutTime: workoutTime ? (workoutTime as WorkoutTime) : undefined,
        // Add the missing [] to PersonalGoals here:
        // Change this line inside your data object:
        personalGoals: personalGoals.length
          ? (personalGoals[0] as PersonalGoals)
          : undefined,
        profilePic: profilePicUrl,
      },
      select: {
        id: true,
        username: true,
        email: true,
        currentLevel: true,
        workoutTime: true,
        personalGoals: true,
        profilePic: true,
      },
    });

    // 7. forward the session cookie better-auth set, so the user is
    //    already logged in once redirected to "/"
    const response = NextResponse.json({ user: updatedUser }, { status: 201 });

    const setCookie = signUpResponse.headers.get("set-cookie");
    if (setCookie) {
      response.headers.set("set-cookie", setCookie);
    }

    return response;
  } catch (error) {
    console.error("Error completing signup", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
