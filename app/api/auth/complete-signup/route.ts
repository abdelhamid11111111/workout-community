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
    const email = ((formData.get("email") as string) || "")
      .trim()
      .toLowerCase();
    const password = formData.get("password") as string;
    const currentLevel = formData.get("currentLevel") as string;
    const workoutTime = formData.get("workoutTime") as string;
    const personalGoals = formData.getAll("personalGoals[]") as string[];
    const profilePic = formData.get("profilePic") as File | null;

    const VALID_GOALS = Object.values(PersonalGoals);
    const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

    // ─── 1. Required fields ──────────────────────────────────────────
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Username, email and password are required" },
        { status: 400 },
      );
    }

    // ─── 2. Username format ──────────────────────────────────────────
    if (username.length < 3 || username.length > 20) {
      return NextResponse.json(
        { error: "Username must be between 3 and 20 characters" },
        { status: 400 },
      );
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return NextResponse.json(
        {
          error: "Username can only contain letters, numbers, and underscores",
        },
        { status: 400 },
      );
    }

    // ─── 3. Email format ──────────────────────────────────────────────
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 },
      );
    }
    if (email.length > 254) {
      return NextResponse.json({ error: "Email is too long" }, { status: 400 });
    }

    // ─── 4. Password rules ────────────────────────────────────────────
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 },
      );
    }
    if (password.length > 72) {
      return NextResponse.json(
        { error: "Password is too long" },
        { status: 400 },
      );
    }

    // ─── 5. Enum fields: currentLevel / workoutTime ──────────────────
    if (!currentLevel || !VALID_LEVELS.includes(currentLevel)) {
      return NextResponse.json(
        { error: "Please select a valid fitness level" },
        { status: 400 },
      );
    }
    if (!workoutTime || !VALID_TIMES.includes(workoutTime)) {
      return NextResponse.json(
        { error: "Please select a valid workout time" },
        { status: 400 },
      );
    }

    // ─── 6. personalGoals array ───────────────────────────────────────
    if (personalGoals.length === 0) {
      return NextResponse.json(
        { error: "Please select at least one goal" },
        { status: 400 },
      );
    }
    if (!personalGoals.every((g) => VALID_GOALS.includes(g as PersonalGoals))) {
      return NextResponse.json(
        { error: "Invalid personal goal provided" },
        { status: 400 },
      );
    }

    // ─── 7. Profile picture ───────────────────────────────────────────
    if (profilePic) {
      if (profilePic.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Profile picture must be under 5MB" },
          { status: 400 },
        );
      }
      if (!ALLOWED_IMAGE_TYPES.includes(profilePic.type)) {
        return NextResponse.json(
          { error: "Profile picture must be a JPG, PNG, or WEBP" },
          { status: 400 },
        );
      }
    }

    // ─── 8. Duplicate checks (DB hits — kept last, cheap checks first) ─
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 },
      );
    }

    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUsername) {
      return NextResponse.json(
        { error: "This username is already taken" },
        { status: 409 },
      );
    }

    // 3. friendly duplicate check before we touch better-auth
    // const existing = await prisma.user.findFirst({
    //   where: { OR: [{ email }, { username }] },
    //   select: { email: true, username: true },
    // });

    // if (existing) {
    //   return NextResponse.json(
    //     {
    //       error:
    //         existing.email === email
    //           ? "An account with this email already exists"
    //           : "This username is already taken",
    //     },
    //     { status: 409 },
    //   );
    // }

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
        personalGoals: personalGoals.length
          ? (personalGoals as PersonalGoals[])
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
