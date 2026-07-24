import { NextRequest } from 'next/server'
import { GET } from './route'

const prismaMock = {
  challenge: {
    findMany: jest.fn(),
  },
}

jest.mock('@/lib/prisma', () => ({ prisma: prismaMock }))

describe('/api/homepage/FeaturedChallenge GET', () => {
  beforeEach(() => jest.clearAllMocks())

  it('returns the top three newest challenges', async () => {
    prismaMock.challenge.findMany.mockResolvedValue([{ id: 'c1' }, { id: 'c2' }, { id: 'c3' }])

    const response = await GET(new NextRequest(new Request('http://localhost/api/homepage/FeaturedChallenge')))

    expect(prismaMock.challenge.findMany).toHaveBeenCalledWith({
      orderBy: { createdAt: 'desc' },
      take: 3,
    })
    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual([{ id: 'c1' }, { id: 'c2' }, { id: 'c3' }])
  })

  it('returns 500 when the database throws', async () => {
    prismaMock.challenge.findMany.mockRejectedValue(new Error('boom'))

    const response = await GET(new NextRequest(new Request('http://localhost/api/homepage/FeaturedChallenge')))

    expect(response.status).toBe(500)
    await expect(response.json()).resolves.toEqual({ error: 'server error' })
  })
})
