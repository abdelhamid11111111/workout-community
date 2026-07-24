import { NextRequest } from 'next/server'
import { GET } from './route'

const authMock = { api: { getSession: jest.fn() } }
const prismaMock = {
  userChallenge: {
    findUnique: jest.fn(),
  },
}

jest.mock('@/lib/auth', () => ({ auth: authMock }))
jest.mock('@/lib/prisma', () => ({ prisma: prismaMock }))

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
