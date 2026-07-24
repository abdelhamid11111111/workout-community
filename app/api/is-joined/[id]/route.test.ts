/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'
import { GET } from './route'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

jest.mock('@/lib/auth', () => ({ auth: { api: { getSession: jest.fn() } } }))
jest.mock('@/lib/prisma', () => ({
  prisma: { userChallenge: { findUnique: jest.fn() } },
}))

const authMock = auth as any
const prismaMock = prisma as any
describe('/api/is-joined/[id] GET', () => {
  beforeEach(() => jest.clearAllMocks())

  it('returns 401 when the request is unauthenticated', async () => {
    authMock.api.getSession.mockResolvedValue(null)

    const response = await GET(new NextRequest(new Request('http://localhost/api/is-joined/c1')), {
      params: Promise.resolve({ id: 'c1' }),
    } as any)

    expect(response.status).toBe(401)
    await expect(response.json()).resolves.toEqual({ error: 'Unauthorized' })
    expect(prismaMock.userChallenge.findUnique).not.toHaveBeenCalled()
  })

  it('returns the join record for an authenticated user', async () => {
    authMock.api.getSession.mockResolvedValue({ user: { id: 'u1' } })
    prismaMock.userChallenge.findUnique.mockResolvedValue({ userId: 'u1', challengeId: 'c1' })

    const response = await GET(new NextRequest(new Request('http://localhost/api/is-joined/c1')), {
      params: Promise.resolve({ id: 'c1' }),
    } as any)

    expect(prismaMock.userChallenge.findUnique).toHaveBeenCalledWith({
      where: { userId_challengeId: { userId: 'u1', challengeId: 'c1' } },
    })
    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({ userId: 'u1', challengeId: 'c1' })
  })
})
