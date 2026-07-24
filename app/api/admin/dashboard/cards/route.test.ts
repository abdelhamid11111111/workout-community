/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'
import { GET } from './route'

jest.mock('@/lib/prisma', () => ({ prisma: {
  challenge: { count: jest.fn() },
  userChallenge: { findMany: jest.fn() },
  user: { count: jest.fn() },
  workout: { count: jest.fn(), findMany: jest.fn() },
} }))
import { prisma } from '@/lib/prisma'
const prismaMock = prisma as any

describe('/api/admin/dashboard/cards GET', () => {
  beforeEach(() => jest.clearAllMocks())

  it('returns the expected dashboard card counts', async () => {
    prismaMock.challenge.count.mockResolvedValue(10)
    prismaMock.userChallenge.findMany.mockResolvedValue([{ challengeId: 'c1' }, { challengeId: 'c2' }])
    prismaMock.user.count.mockResolvedValue(5)
    prismaMock.workout.count.mockResolvedValue(12)
    prismaMock.workout.findMany.mockResolvedValue([{ caloriesBurned: 100 }, { caloriesBurned: 50 }])

    const response = await GET(new NextRequest(new Request('http://localhost/api/admin/dashboard/cards')))

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({
      totalUsers: 5,
      totalPar: 2,
      countChallenges: 10,
      totalWorkouts: 12,
      activeChallengesCount: 2,
      totalCalories: 150,
    })
  })
})
