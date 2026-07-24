/**
 * @jest-environment node
 */
// app/api/auth/complete-signup/route.test.ts
import { POST } from "./route";
import { NextRequest } from "next/server";

// ── Mocks ──────────────────────────────────────────────────────────
// IMPORTANT: jest.mock calls are hoisted, so these must reference the
// exact import paths used inside route.ts.

jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  },
}));

jest.mock("@/lib/auth", () => ({
  auth: {
    api: {
      signUpEmail: jest.fn(),
    },
  },
}));

jest.mock("@/lib/cloudinary", () => ({
  __esModule: true,
  default: {
    uploader: {
      upload: jest.fn(),
    },
  },
}));

// This is almost certainly your real bug: PersonalGoals is a generated
// Prisma enum. If it isn't mocked, `Object.values(PersonalGoals)` in
// route.ts is empty/undefined at test time, so ANY personalGoals value
// fails validation and the route 400s before it ever reaches the
// duplicate-email/username checks — which is exactly the symptom you're
// seeing (400 instead of 409).
//
// Replace these values with whatever your actual prisma schema defines.
jest.mock("@/generated/prisma/enums", () => ({
  Level: { beginner: "beginner", intermediate: "intermediate", advanced: "advanced" },
  WorkoutTime: { Morning: "Morning", Afternoon: "Afternoon", Evening: "Evening", Night: "Night" },
  PersonalGoals: {
    LOSE_WEIGHT: "LOSE_WEIGHT",
    BUILD_MUSCLE: "BUILD_MUSCLE",
    STAY_FIT: "STAY_FIT",
  },
}));

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// ── Helpers ────────────────────────────────────────────────────────

function buildFormData(overrides: Record<string, string | string[]> = {}) {
  const defaults: Record<string, string | string[]> = {
    username: "validuser",
    email: "valid@example.com",
    password: "supersecret123",
    currentLevel: "beginner",
    workoutTime: "Morning",
    "personalGoals[]": ["LOSE_WEIGHT"],
  };

  const merged = { ...defaults, ...overrides };
  const formData = new FormData();

  for (const [key, value] of Object.entries(merged)) {
    if (Array.isArray(value)) {
      value.forEach((v) => formData.append(key, v));
    } else {
      formData.append(key, value);
    }
  }

  return formData;
}

function buildRequest(formData: FormData) {
  return new NextRequest("http://localhost/api/auth/complete-signup", {
    method: "POST",
    body: formData,
  });
}

// ── Tests ──────────────────────────────────────────────────────────

describe("/api/auth/complete-signup POST", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns 400 when required fields are missing", async () => {
    const formData = buildFormData({ username: "", email: "", password: "" });
    const response = await POST(buildRequest(formData));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Username, email and password are required",
    });
    // duplicate checks should never be reached
    expect(prisma.user.findUnique).not.toHaveBeenCalled();
  });

  it("returns 409 when the email already exists", async () => {
    (prisma.user.findUnique as unknown as jest.Mock).mockResolvedValueOnce({
      id: "existing-user-id",
      email: "valid@example.com",
    });

    const response = await POST(buildRequest(buildFormData()));

    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toEqual({
      error: "An account with this email already exists",
    });
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: "valid@example.com" },
    });
    // should short-circuit before checking username or calling auth
    expect(auth.api.signUpEmail).not.toHaveBeenCalled();
  });

  it("returns 409 when the username already exists", async () => {
    (prisma.user.findUnique as unknown as jest.Mock)
      .mockResolvedValueOnce(null) // email check passes
      .mockResolvedValueOnce({ id: "existing-user-id", username: "validuser" }); // username check fails

    const response = await POST(buildRequest(buildFormData()));

    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toEqual({
      error: "This username is already taken",
    });
    expect(prisma.user.findUnique).toHaveBeenCalledTimes(2);
    expect(auth.api.signUpEmail).not.toHaveBeenCalled();
  });

  it("creates a user and forwards the session cookie on success", async () => {
    (prisma.user.findUnique as unknown as jest.Mock).mockResolvedValue(null);
    (auth.api.signUpEmail as unknown as jest.Mock).mockResolvedValue(
      new Response(JSON.stringify({ user: { id: "new-user-id" } }), {
        status: 200,
        headers: { "set-cookie": "session=abc123; Path=/; HttpOnly" },
      }),
    );
    (prisma.user.update as unknown as jest.Mock).mockResolvedValue({
      id: "new-user-id",
      username: "validuser",
      email: "valid@example.com",
      currentLevel: "beginner",
      workoutTime: "Morning",
      personalGoals: ["LOSE_WEIGHT"],
      profilePic: null,
    });

    const response = await POST(buildRequest(buildFormData()));

    expect(response.status).toBe(201);
    const body = await response.json();
    expect(body.user).toEqual(
      expect.objectContaining({ id: "new-user-id", username: "validuser" }),
    );
    expect(response.headers.get("set-cookie")).toContain("session=abc123");
  });

  it("returns 400 when the fitness level is invalid", async () => {
    const response = await POST(buildRequest(buildFormData({ currentLevel: "not-a-level" })));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Please select a valid fitness level",
    });
  });

  it("returns 400 when no personal goals are provided", async () => {
    const formData = buildFormData();
    formData.delete("personalGoals[]");
    const response = await POST(buildRequest(formData));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Please select at least one goal",
    });
  });
});