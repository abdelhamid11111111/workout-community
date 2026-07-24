/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { GET } from "./route";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

jest.mock("@/lib/auth", () => ({ auth: { api: { getSession: jest.fn() } } }));
jest.mock("@/lib/prisma", () => ({
  prisma: { userChallenge: { findMany: jest.fn() } },
}));

const authMock = auth as any;
const prismaMock = prisma as any;
describe("/api/mychallenges GET", () => {
  beforeEach(() => jest.clearAllMocks());

  it("returns 401 for unauthenticated requests", async () => {
    authMock.api.getSession.mockResolvedValue(null);

    const response = await GET(
      new NextRequest(new Request("http://localhost/api/mychallenges")),
    );

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({ error: "Unauthorized" });
    expect(prismaMock.userChallenge.findMany).not.toHaveBeenCalled();
  });

  it("returns mapped challenge data for the authenticated user", async () => {
    authMock.api.getSession.mockResolvedValue({ user: { id: "u1" } });
    prismaMock.userChallenge.findMany.mockResolvedValue([
      {
        userId: "u1",
        joinedAt: new Date("2026-07-01"),
        challenge: { id: "c1", days: 5, _count: { workouts: 2 } },
        user: { id: "u1" },
        isCompleted: false,
        isActive: true,
      },
    ]);

    const response = await GET(
      new NextRequest(new Request("http://localhost/api/mychallenges")),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual([
      {
        userId: "u1",
        joinedAt: new Date("2026-07-01").toISOString(),
        challenge: { id: "c1", days: 5, _count: { workouts: 2 } },
        user: { id: "u1" },
        isCompleted: false,
        isActive: true,
        workoutCount: 2,
      },
    ]);
  });
});
