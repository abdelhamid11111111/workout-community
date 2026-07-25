import { randomUUID } from 'crypto'

export function buildUser(overrides: Partial<{ id: string; email: string; username: string; role: string }> = {}) {
  const suffix = randomUUID().slice(0, 8)
  return {
    id: overrides.id ?? randomUUID(),
    email: overrides.email ?? `user-${suffix}@example.test`,
    username: overrides.username ?? `user_${suffix}`,
    role: overrides.role ?? 'user',
    name: 'Test User',
  }
}

export function buildChallenge(overrides: Record<string, unknown> = {}) {
  const suffix = randomUUID().slice(0, 8)
  return {
    id: (overrides.id as string) ?? randomUUID(),
    title: `Challenge ${suffix}`,
    category: 'Cardio',
    level: 'beginner',
    days: 7,
    active: true,
    rewardPoints: 100,
    goals: [],
    imgs: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }
}

export function buildSession(user: ReturnType<typeof buildUser>) {
  return { user, session: { id: randomUUID(), userId: user.id, expiresAt: new Date(Date.now() + 3600_000) } }
}