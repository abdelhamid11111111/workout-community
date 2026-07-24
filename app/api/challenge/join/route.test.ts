/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'
import { POST } from './route'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

jest.mock('@/lib/auth', () => ({ auth: { api: { getSession: jest.fn() } } }))
jest.mock('@/lib/prisma', () => ({
  prisma: { userChallenge: { create: jest.fn() } },
}))

const authMock = auth as any
const prismaMock = prisma as any

const makeRequest = (body: any) =>
  new NextRequest(new Request('http://localhost/api/challenge/join', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }))
describe('/api/challenge/join POST', () => {
  beforeEach(() => jest.clearAllMocks())

  it('returns 401 for unauthenticated requests', async () => {
    authMock.api.getSession.mockResolvedValue(null)

    const response = await POST(makeRequest({ challengeId: 'c1' }))

    expect(response.status).toBe(401)
    await expect(response.json()).resolves.toEqual({ error: 'Unauthorized' })
    expect(prismaMock.userChallenge.create).not.toHaveBeenCalled()
  })

  it('returns 400 when challengeId is missing', async () => {
    authMock.api.getSession.mockResolvedValue({ user: { id: 'u1' } })

    const response = await POST(makeRequest({}))

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({ error: 'no challenge found' })
  })

  it('creates a join and returns 201 on success', async () => {
    authMock.api.getSession.mockResolvedValue({ user: { id: 'u1' } })
    prismaMock.userChallenge.create.mockResolvedValue({ id: 'join1', challengeId: 'c1', userId: 'u1' })

    const response = await POST(makeRequest({ challengeId: 'c1' }))

    expect(prismaMock.userChallenge.create).toHaveBeenCalledWith({
      data: { userId: 'u1', challengeId: 'c1' },
    })
    expect(response.status).toBe(201)
    await expect(response.json()).resolves.toEqual({ id: 'join1', challengeId: 'c1', userId: 'u1' })
  })

  it('returns 409 for duplicate joins', async () => {
    authMock.api.getSession.mockResolvedValue({ user: { id: 'u1' } })
    const duplicateError = new Error('dup') as any
    duplicateError.code = 'P2002'
    duplicateError.name = 'PrismaClientKnownRequestError'
    prismaMock.userChallenge.create.mockRejectedValue(duplicateError)

    const response = await POST(makeRequest({ challengeId: 'c1' }))

    expect(response.status).toBe(409)
    await expect(response.json()).resolves.toEqual({ error: 'Already joined' })
  })

  it('returns 500 when prisma throws an unknown error', async () => {
    authMock.api.getSession.mockResolvedValue({ user: { id: 'u1' } })
    prismaMock.userChallenge.create.mockRejectedValue(new Error('boom'))

    const response = await POST(makeRequest({ challengeId: 'c1' }))

    expect(response.status).toBe(500)
    await expect(response.json()).resolves.toEqual({ error: 'server error' })
  })
})
