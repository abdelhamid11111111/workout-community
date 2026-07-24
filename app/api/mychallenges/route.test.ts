import { NextRequest } from 'next/server'
import { GET } from './route'

const authMock = { api: { getSession: jest.fn() } }
const prismaMock = {
  userChallenge: {
    findMany: jest.fn(),
  },
}

jest.mock('@/lib/auth', () => ({ auth: authMock }))
jest.mock('@/lib/prisma', () => ({ prisma: prismaMock }))

describe('/api/mychallenges GET', () => {
  beforeEach(() => jest.clearAllMocks())

  it('returns 401 for unauthenticated requests', async () => {
    authMock.api.getSession.mockResolvedValue(null)

    const response = await GET(new NextRequest(new Request('http://localhost/api/mychallenges')))

    expect(response.status).toBe(401)
    await expect(response.json()).resolves.toEqual({ error: 'Unauthorized' })
    expect(prismaMock.userChallenge.findMany).not.toHaveBeenCalled()
  })

  it('returns mapped challenge data for the authenticated user', async () => {
    authMock.api.getSession.mockResolvedValue({ user: { id: 'u1' } })
    prismaMock.userChallenge.findMany.mockResolvedValue([
      {
        userId: 'u1',
        joinedAt: new Date('2026-07-01'),
        challenge: { id: 'c1', days: 5, _count: { workouts: 2 } },
        user: { id: 'u1' },
        isCompleted: false,
        isActive: true,
      },
    ])

    const response = await GET(new NextRequest(new Request('http://localhost/api/mychallenges')))

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual([
      {
        userId: 'u1',
        joinedAt: expect.any(Date),
        challenge: { id: 'c1', days: 5, _count: { workouts: 2 } },
        user: { id: 'u1' },
        isCompleted: false,
        isActive: true,
        workoutCount: 2,
      },
    ])
  })
})
