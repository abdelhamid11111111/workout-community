/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'
import { GET } from './route'

jest.mock('@/lib/prisma', () => ({ prisma: {
  challenge: {
    findFirst: jest.fn(),
  },
} }))
import { prisma } from '@/lib/prisma'
const prismaMock = prisma as any

describe('/api/challenge/[title] GET', () => {
  beforeEach(() => jest.clearAllMocks())

  it('reads the awaited params and returns challenge details', async () => {
    prismaMock.challenge.findFirst.mockResolvedValue({
      id: 'c1',
      title: 'Run 5k',
      userChallenges: [{ id: 'uc1' }],
      goals: ['Goal 1'],
      imgs: ['img1'],
    })

    const response = await GET(new NextRequest(new Request('http://localhost/api/challenge/Run%205k')), {
      params: Promise.resolve({ title: 'Run 5k' }),
    } as any)

    expect(prismaMock.challenge.findFirst).toHaveBeenCalledWith({
      where: { title: 'Run 5k' },
      include: { userChallenges: true },
    })
    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({
      challenge: {
        id: 'c1',
        title: 'Run 5k',
        userChallenges: [{ id: 'uc1' }],
        goals: ['Goal 1'],
        imgs: ['img1'],
      },
      totalUsr: 1,
      goals: ['Goal 1'],
      imgs: ['img1'],
    })
  })

  it('returns a 500 response when prisma throws', async () => {
    prismaMock.challenge.findFirst.mockRejectedValue(new Error('boom'))

    const response = await GET(new NextRequest(new Request('http://localhost/api/challenge/run')), {
      params: Promise.resolve({ title: 'run' }),
    } as any)

    expect(response.status).toBe(500)
    await expect(response.json()).resolves.toEqual({ error: 'server error' })
  })
})
