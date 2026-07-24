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

describe('/api/admin/dashboard/topChall GET', () => {
  beforeEach(() => jest.clearAllMocks())

  it('rejects invalid page numbers', async () => {
    const response = await GET(new NextRequest(new Request('http://localhost/api/admin/dashboard/topChall?page=0')))

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({ error: 'page number is not valid' })
  })

  it('returns paginated challenge data on success', async () => {
    prismaMock.challenge.count.mockResolvedValue(9)
    prismaMock.challenge.findMany.mockResolvedValue([{ id: 'c1' }])

    const response = await GET(new NextRequest(new Request('http://localhost/api/admin/dashboard/topChall?page=1&search=sprint')))

    expect(prismaMock.challenge.count).toHaveBeenCalledWith({
      where: { title: { contains: 'sprint', mode: 'insensitive' } },
    })
    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toMatchObject({
      data: [{ id: 'c1' }],
      pagination: { totalItems: 9, currentPage: 1 },
    })
  })
})
