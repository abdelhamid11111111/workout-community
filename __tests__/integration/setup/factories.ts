import { randomUUID } from 'crypto'
import { auth } from '@/lib/auth'
import { getTestPrismaClient } from './testDb'
import { Categories, Level } from '@/generated/prisma/enums'

const prisma = () => getTestPrismaClient()

export async function createChallenge(overrides: Partial<{
  title: string
  category: Categories
  level: Level
  days: number
  active: boolean
  rewardPoints: number
}> = {}) {
  const suffix = randomUUID().slice(0, 8)
  return prisma().challenge.create({
    data: {
      title: overrides.title ?? `Challenge ${suffix}`,
      category: overrides.category ?? Categories.Cardio,
      level: overrides.level ?? Level.beginner,
      days: overrides.days ?? 7,
      active: overrides.active ?? true,
      rewardPoints: overrides.rewardPoints ?? 100,
      goals: [],
      imgs: [],
    },
  })
}

// Uses the REAL better-auth sign-up endpoint end-to-end (hashing, session
// creation, DB writes via the prisma adapter) instead of mocking auth.
// This is the whole point of "integration": the same auth code path that
// runs in production runs here.
export async function signUpAndAuthenticate(overrides: {
  email?: string
  username?: string
  password?: string
  name?: string
} = {}) {
  const suffix = randomUUID().slice(0, 8)
  const email = overrides.email ?? `user-${suffix}@example.test`
  const username = overrides.username ?? `user_${suffix}`
  const password = overrides.password ?? 'Str0ngTestPassw0rd!'
  const name = overrides.name ?? 'Integration Test User'

  const response = (await auth.api.signUpEmail({
    body: { email, password, name, username },
    asResponse: true,
  })) as Response

  if (!response.ok) {
    throw new Error(`Real sign-up flow failed while seeding a test user: ${response.status} ${await response.text()}`)
  }

  const cookieHeader = extractCookieHeader(response)
  const user = await prisma().user.findUniqueOrThrow({ where: { email } })

  return { user, cookieHeader }
}

function extractCookieHeader(response: Response): string {
  const headers = response.headers as Headers & { getSetCookie?: () => string[] }
  const raw = typeof headers.getSetCookie === 'function'
    ? headers.getSetCookie()
    : ([headers.get('set-cookie')].filter(Boolean) as string[])

  if (raw.length === 0) {
    throw new Error('better-auth did not set a session cookie on sign-up; cannot build an authenticated request')
  }
  // Each Set-Cookie is "name=value; Path=/; HttpOnly; ..." — a request
  // Cookie header only wants the "name=value" pairs.
  return raw.map((c) => c.split(';')[0]).join('; ')
}

export async function expireSession(cookieHeader: string): Promise<void> {
  const token = decodeSessionToken(cookieHeader)
  await prisma().session.updateMany({
    where: { token },
    data: { expiresAt: new Date(Date.now() - 60 * 60 * 1000) },
  })
}

export async function revokeSession(cookieHeader: string): Promise<void> {
  const token = decodeSessionToken(cookieHeader)
  await prisma().session.deleteMany({ where: { token } })
}

function decodeSessionToken(cookieHeader: string): string {
  const match = cookieHeader.match(/better-auth\.session_token=([^;]+)/)
  if (!match) throw new Error('cookie header did not contain a better-auth session token')
  // Cookie value is `${token}.${signature}`; the DB stores the raw token.
  return decodeURIComponent(match[1]).split('.')[0]
}

export function tamperedCookie(cookieHeader: string): string {
  return cookieHeader.replace(
    /better-auth\.session_token=([^;]+)/,
    (_m, v: string) => `better-auth.session_token=${v.slice(0, -4)}zzzz`,
  )
}