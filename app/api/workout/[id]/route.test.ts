/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'
import { GET, POST, DELETE } from './route'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

jest.mock('next/headers', () => ({ headers: jest.fn().mockResolvedValue(new Headers()) }))
jest.mock('@/lib/auth', () => ({ auth: { api: { getSession: jest.fn() } } }))
jest.mock('@/lib/prisma', () => ({
  prisma: {
    workout: { create: jest.fn(), findMany: jest.fn(), deleteMany: jest.fn() },
    userChallenge: { delete: jest.fn() },
    $transaction: jest.fn(),
  },
}))

const authMock = auth as any
const prismaMock = prisma as any

const makeRequest = (body: any, method = 'POST') =>
  new NextRequest(new Request('http://localhost/api/workout/c1', {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  }))
describe('/api/workout/[id] route', () => {
  beforeEach(() => jest.clearAllMocks())

  it('returns 401 for unauthenticated POST', async () => {
    authMock.api.getSession.mockResolvedValue(null)

    const response = await POST(makeRequest({ duration: 30, burnedCalories: 250, selectedFeel: 'Good', selectedIntensity: 'Medium' }), { params: Promise.resolve({ id: 'c1' }) } as any)

    expect(response.status).toBe(401)
    await expect(response.json()).resolves.toEqual({ error: 'Unauthorized: user not found' })
    expect(prismaMock.workout.create).not.toHaveBeenCalled()
  })

  it('returns 400 for invalid POST payload', async () => {
    authMock.api.getSession.mockResolvedValue({ user: { id: 'u1' } })

    const response = await POST(makeRequest({ duration: 0, burnedCalories: 0, selectedFeel: '', selectedIntensity: '' }), { params: Promise.resolve({ id: 'c1' }) } as any)

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({ error: 'Missing required fields' })
  })

  it('creates a workout and returns 201 on success', async () => {
    authMock.api.getSession.mockResolvedValue({ user: { id: 'u1' } })
    prismaMock.workout.create.mockResolvedValue({ id: 'w1', challenge: { id: 'c1' } })

    const response = await POST(makeRequest({ duration: 30, burnedCalories: 250, selectedFeel: 'Good', selectedIntensity: 'Medium' }), { params: Promise.resolve({ id: 'c1' }) } as any)

    expect(prismaMock.workout.create).toHaveBeenCalledWith({
      data: {
        duration: 30,
        challengeId: 'c1',
        userId: 'u1',
        caloriesBurned: 250,
        intensityLevel: 'Medium',
        feel: 'Good',
        loggedAt: expect.any(Date),
      },
      include: { challenge: true },
    })
    expect(response.status).toBe(201)
  })

  it('returns the workout streak summary for GET requests', async () => {
    authMock.api.getSession.mockResolvedValue({ user: { id: 'u1' } })
    prismaMock.workout.findMany.mockResolvedValue([{ loggedAt: new Date('2026-07-24T10:00:00Z') }])

    const response = await GET(new NextRequest(new Request('http://localhost/api/workout/c1')), { params: Promise.resolve({ id: 'c1' }) } as any)

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({ countWorkout: 1, currentStreak: 1 })
  })

  it('deletes the workout and join record on DELETE', async () => {
    authMock.api.getSession.mockResolvedValue({ user: { id: 'u1' } })
    prismaMock.$transaction.mockResolvedValue([])

    const response = await DELETE(new NextRequest(new Request('http://localhost/api/workout/c1', { method: 'DELETE' })), { params: Promise.resolve({ id: 'c1' }) } as any)

    expect(prismaMock.$transaction).toHaveBeenCalledWith([
      prismaMock.workout.deleteMany({ where: { userId: 'u1', challengeId: 'c1' } }),
      prismaMock.userChallenge.delete({ where: { userId_challengeId: { userId: 'u1', challengeId: 'c1' } } }),
    ])
    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({ success: true })
  })
})
