import { NextRequest } from 'next/server'
import { GET } from './route'

const prismaMock = {
  user: {
    count: jest.fn(),
    findMany: jest.fn(),
  },
}

jest.mock('@/lib/prisma', () => ({ prisma: prismaMock }))

describe('/api/admin/users/table GET', () => {
  beforeEach(() => jest.clearAllMocks())

  it('returns paginated users and pagination metadata', async () => {
    prismaMock.user.count.mockResolvedValue(16)
    prismaMock.user.findMany.mockResolvedValue([{ id: 'u1' }])

    const response = await GET(new NextRequest(new Request('http://localhost/api/admin/users/table?page=1&search=jane&level=beginner')))

    expect(prismaMock.user.count).toHaveBeenCalledWith({
      where: {
        name: { contains: 'jane', mode: 'insensitive' },
        currentLevel: 'beginner',
      },
    })
    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toMatchObject({
      data: [{ id: 'u1' }],
      pagination: { totalItems: 16, totalPages: 2, currentPage: 1 },
    })
  })
})
