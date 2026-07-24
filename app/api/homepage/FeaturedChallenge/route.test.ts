/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'
import { GET } from './route'

jest.mock('@/lib/prisma', () => ({ prisma: {
  challenge: {
    findMany: jest.fn(),
  },
} }))
import { prisma } from '@/lib/prisma'
const prismaMock = prisma as any

describe('/api/homepage/FeaturedChallenge GET', () => {
  beforeEach(() => jest.clearAllMocks())

  it('returns the top three newest challenges', async () => {
    prismaMock.challenge.findMany.mockResolvedValue([{ id: 'c1' }, { id: 'c2' }, { id: 'c3' }])

    const response = await GET()

    expect(prismaMock.challenge.findMany).toHaveBeenCalledWith({
      orderBy: { createdAt: 'desc' },
      take: 3,
    })
    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual([{ id: 'c1' }, { id: 'c2' }, { id: 'c3' }])
  })

  it('returns 500 when the database throws', async () => {
    prismaMock.challenge.findMany.mockRejectedValue(new Error('boom'))

    const response = await GET()

    expect(response.status).toBe(500)
    await expect(response.json()).resolves.toEqual({ error: 'server error' })
  })
})
