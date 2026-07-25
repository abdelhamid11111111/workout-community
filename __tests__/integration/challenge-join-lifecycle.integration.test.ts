import { prismaMock } from "../../__mocks__/prisma";
jest.mock("@/lib/prisma", () => ({ prisma: prismaMock }));
jest.mock("@/lib/auth", () => ({ auth: { api: { getSession: jest.fn() } } }));

import { NextRequest } from "next/server";
import { POST as joinChallenge } from "@/app/api/challenge/join/route";
import { GET as isJoined } from "@/app/api/is-joined/[id]/route";
import { auth } from "@/lib/auth";
import { buildUser, buildSession } from "./setup/factories";

const getSession = auth.api.getSession as unknown as jest.Mock;

const joinReq = (body: unknown, rawBody?: string) =>
  new NextRequest(
    new Request("http://localhost/api/challenge/join", {
      method: "POST",
      body: rawBody ?? JSON.stringify(body),
    }),
  );

const isJoinedReq = (id: string) =>
  isJoined(
    new NextRequest(new Request(`http://localhost/api/is-joined/${id}`)),
    { params: Promise.resolve({ id }) },
  );

describe("Challenge join + is-joined", () => {
  it("happy path: authenticated join succeeds 201", async () => {
    const user = buildUser();
    getSession.mockResolvedValue(buildSession(user));
    prismaMock.userChallenge.create.mockResolvedValue({
      id: "uc1",
      userId: user.id,
      challengeId: "c1",
    } as never);

    const res = await joinChallenge(joinReq({ challengeId: "c1" }));
    expect(res.status).toBe(201);
  });

  it("fault tolerance: unauthenticated join returns 401, Prisma never touched", async () => {
    getSession.mockResolvedValue(null);
    const res = await joinChallenge(joinReq({ challengeId: "c1" }));
    expect(res.status).toBe(401);
    expect(prismaMock.userChallenge.create).not.toHaveBeenCalled();
  });

  it("edge case: missing challengeId returns 400", async () => {
    getSession.mockResolvedValue(buildSession(buildUser()));
    const res = await joinChallenge(joinReq({}));
    expect(res.status).toBe(400);
  });

  it("fault tolerance: malformed JSON body — req.json() throws OUTSIDE the route's try/catch, " +
      "so calling the handler directly rejects rather than returning a response...",
    async () => {
      getSession.mockResolvedValue(buildSession(buildUser()));
      await expect(
        joinChallenge(joinReq(undefined, "{not valid json")),
      ).rejects.toThrow();
    },
  );

  it(
    "fault tolerance: duplicate join — Prisma unique-constraint error (P2002) -> 409. " +
      "NOTE: this used to be proven with a real concurrent race against Postgres; " +
      "mocked, it only proves the route's P2002 handling exists, not that the DB " +
      "actually enforces the constraint under real concurrency.",
    async () => {
      getSession.mockResolvedValue(buildSession(buildUser()));
      prismaMock.userChallenge.create.mockRejectedValue({ code: "P2002" });
      const res = await joinChallenge(joinReq({ challengeId: "c1" }));
      expect(res.status).toBe(409);
    },
  );

  it(
    "fault tolerance: FK violation (nonexistent challengeId) — P2003 falls through to the " +
      "generic catch since the route only special-cases P2002 — must be 500, not unhandled",
    async () => {
      getSession.mockResolvedValue(buildSession(buildUser()));
      prismaMock.userChallenge.create.mockRejectedValue({ code: "P2003" });
      const res = await joinChallenge(
        joinReq({ challengeId: "does-not-exist" }),
      );
      expect(res.status).toBe(500);
    },
  );

  it("happy path: is-joined returns the record when Prisma finds one", async () => {
    getSession.mockResolvedValue(buildSession(buildUser()));
    prismaMock.userChallenge.findUnique.mockResolvedValue({
      id: "uc1",
    } as never);
    const res = await isJoinedReq("c1");
    expect(await res.json()).toMatchObject({ id: "uc1" });
  });

  it("happy path: is-joined returns null (not an error) when Prisma finds nothing", async () => {
    getSession.mockResolvedValue(buildSession(buildUser()));
    prismaMock.userChallenge.findUnique.mockResolvedValue(null);
    const res = await isJoinedReq("c1");
    expect(res.status).toBe(200);
    expect(await res.json()).toBeNull();
  });

  it("fault tolerance: unauthenticated is-joined returns 401", async () => {
    getSession.mockResolvedValue(null);
    const res = await isJoinedReq("c1");
    expect(res.status).toBe(401);
  });
});
