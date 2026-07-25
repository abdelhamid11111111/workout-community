import { prismaMock } from "../../__mocks__/prisma";
jest.mock("@/lib/prisma", () => ({ prisma: prismaMock }));
jest.mock("@/lib/auth", () => ({ auth: { api: { getSession: jest.fn() } } }));

import { NextRequest } from "next/server";
import { GET as myChallenges } from "@/app/api/mychallenges/route";
import { auth } from "@/lib/auth";
import { buildUser, buildSession, buildChallenge } from "./setup/factories";

const getSession = auth.api.getSession as unknown as jest.Mock;
const request = () =>
  myChallenges(
    new NextRequest(new Request("http://localhost/api/mychallenges")),
  );

describe("GET /api/mychallenges — completion calculation", () => {
  it("happy path: workoutCount below `days` -> not completed, active", async () => {
    getSession.mockResolvedValue(buildSession(buildUser()));
    prismaMock.userChallenge.findMany.mockResolvedValue([
      {
        id: "uc1",
        joinedAt: new Date(),
        challenge: { ...buildChallenge({ days: 5 }), _count: { workouts: 2 } },
      },
    ] as never);

    const res = await request();
    const [entry] = await res.json();
    expect(entry.isCompleted).toBe(false);
    expect(entry.isActive).toBe(true);
  });

  it("happy path: workoutCount >= `days` -> completed, inactive", async () => {
    getSession.mockResolvedValue(buildSession(buildUser()));
    prismaMock.userChallenge.findMany.mockResolvedValue([
      {
        id: "uc1",
        joinedAt: new Date(),
        challenge: { ...buildChallenge({ days: 2 }), _count: { workouts: 2 } },
      },
    ] as never);

    const res = await request();
    const [entry] = await res.json();
    expect(entry.isCompleted).toBe(true);
    expect(entry.isActive).toBe(false);
  });

  it("fault tolerance: unauthenticated request returns 401, Prisma never queried", async () => {
    getSession.mockResolvedValue(null);
    const res = await request();
    expect(res.status).toBe(401);
    expect(prismaMock.userChallenge.findMany).not.toHaveBeenCalled();
  });

  it("fault tolerance: user with zero joined challenges gets a clean empty array", async () => {
    getSession.mockResolvedValue(buildSession(buildUser()));
    prismaMock.userChallenge.findMany.mockResolvedValue([]);
    const res = await request();
    expect(await res.json()).toEqual([]);
  });

  it("fault tolerance: Prisma failure is NOT caught by this route...", async () => {
    getSession.mockResolvedValue(buildSession(buildUser()));
    prismaMock.userChallenge.findMany.mockRejectedValue(new Error("db down"));
    await expect(request()).rejects.toThrow("db down");
  });
});
