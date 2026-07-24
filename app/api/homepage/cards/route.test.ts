import { NextRequest } from 'next/server'
import { GET } from './route'

const prismaMock = {
  challenge: { count: jest.fn() },
  userChallenge: { findMany: jest.fn(), },
  workout: { count: jest.fn() },
}

jest.mock('@/lib/prisma', () => ({ prisma: prismaMock }))

describe('/api/homepage/cards GET', () => {
  beforeEach(() => jest.clearAllMocks())

  it('returns totals from prisma on success', async () => {
    prismaMock.challenge.count.mockResolvedValue(3)
    prismaMock.userChallenge.findMany.mockResolvedValue([{ userId: 'u1' }, { userId: 'u2' }])
    prismaMock.workout.count.mockResolvedValue(9)

    const response = await GET(new NextRequest(new Request('http://localhost/api/homepage/cards')))

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({ challenges: 3, totalPar: 2, totalJoins: 9, totalWorkout: 9 })
  })

  it('returns 400 when prisma throws', async () => {
    prismaMock.challenge.count.mockRejectedValue(new Error('boom'))

    const response = await GET(new NextRequest(new Request('http://localhost/api/homepage/cards')))

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({ error: 'server error' })
  })
})
