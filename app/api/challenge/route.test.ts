/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'
import { GET } from './route'

jest.mock('@/lib/prisma', () => ({ prisma: {
  challenge: {
    count: jest.fn(),
    findMany: jest.fn(),
  },
} }))
import { prisma } from '@/lib/prisma'
const prismaMock = prisma as any

describe('/api/challenge GET', () => {
  beforeEach(() => jest.clearAllMocks())

  const makeRequest = (search = '') =>
    new NextRequest(new Request(`http://localhost/api/challenge${search ? `?${search}` : ''}`))

  it('returns 400 for invalid page numbers', async () => {
    const response = await GET(makeRequest('page=0'))

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({ error: 'page number is not valid' })
  })

  it('returns paginated challenge data on success', async () => {
    prismaMock.challenge.count.mockResolvedValue(12)
    prismaMock.challenge.findMany.mockResolvedValue([{ id: 'c1' }])

    const response = await GET(makeRequest('page=1&search=run&category=Strength&status=true&level=beginner'))

    expect(prismaMock.challenge.count).toHaveBeenCalledWith({
      where: {
        category: 'Strength',
        title: { contains: 'run', mode: 'insensitive' },
        active: true,
        level: 'beginner',
      },
    })
    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toMatchObject({
      data: [{ id: 'c1' }],
      pagination: {
        currentPage: 1,
        totalPages: 2,
        totalItems: 12,
      },
    })
  })

  it('returns a 500 response when the database throws', async () => {
    prismaMock.challenge.count.mockRejectedValue(new Error('boom'))

    const response = await GET(makeRequest())

    expect(response.status).toBe(500)
    await expect(response.json()).resolves.toEqual({ error: 'server error' })
  })
})
