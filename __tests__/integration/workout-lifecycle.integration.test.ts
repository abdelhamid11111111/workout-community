import { prismaMock } from '../../__mocks__/prisma'
jest.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
jest.mock('@/lib/auth', () => ({ auth: { api: { getSession: jest.fn() } } }))
jest.mock('next/headers', () => ({ headers: jest.fn().mockResolvedValue(new Headers()) }))

import { NextRequest } from 'next/server'
import { POST as logWorkout, GET as getStats, DELETE as deleteProgress } from '@/app/api/workout/[id]/route'
import { auth } from '@/lib/auth'
import { buildUser, buildSession } from './setup/factories'

const getSession = auth.api.getSession as unknown as jest.Mock
const validBody = { duration: 30, burnedCalories: 200, selectedFeel: 'Good', selectedIntensity: 'Moderate' }

const logReq = (id: string, body: unknown) =>
  logWorkout(new NextRequest(new Request(`http://localhost/api/workout/${id}`, { method: 'POST', body: JSON.stringify(body) })), { params: Promise.resolve({ id }) })
const statsReq = (id: string) =>
  getStats(new NextRequest(new Request(`http://localhost/api/workout/${id}`)), { params: Promise.resolve({ id }) })
const deleteReq = (id: string) =>
  deleteProgress(new NextRequest(new Request(`http://localhost/api/workout/${id}`, { method: 'DELETE' })), { params: Promise.resolve({ id }) })

describe('Workout lifecycle', () => {
  it('happy path: logging a valid workout returns 201', async () => {
    getSession.mockResolvedValue(buildSession(buildUser()))
    prismaMock.workout.create.mockResolvedValue({ id: 'w1', challenge: {} } as never)
    const res = await logReq('c1', validBody)
    expect(res.status).toBe(201)
  })

  it('fault tolerance: unauthenticated log returns 401, Prisma never touched', async () => {
    getSession.mockResolvedValue(null)
    const res = await logReq('c1', validBody)
    expect(res.status).toBe(401)
    expect(prismaMock.workout.create).not.toHaveBeenCalled()
  })

  it.each([
    ['negative duration', { ...validBody, duration: -5 }],
    ['non-numeric duration', { ...validBody, duration: 'nope' }],
    ['negative calories', { ...validBody, burnedCalories: -1 }],
  ])('edge case: %s -> 400, no write attempted', async (_label, body) => {
    getSession.mockResolvedValue(buildSession(buildUser()))
    const res = await logReq('c1', body)
    expect(res.status).toBe(400)
    expect(prismaMock.workout.create).not.toHaveBeenCalled()
  })

  it('fault tolerance: FK violation (bad challengeId) -> 500, not a crash', async () => {
    getSession.mockResolvedValue(buildSession(buildUser()))
    prismaMock.workout.create.mockRejectedValue({ code: 'P2003' })
    const res = await logReq('does-not-exist', validBody)
    expect(res.status).toBe(500)
  })

  it('happy path: GET computes streak/count from returned rows', async () => {
    getSession.mockResolvedValue(buildSession(buildUser()))
    prismaMock.workout.findMany.mockResolvedValue([{ loggedAt: new Date() }] as never)
    const res = await statsReq('c1')
    const body = await res.json()
    expect(body.countWorkout).toBe(1)
  })

  it('fault tolerance: $transaction rejecting (simulating the userChallenge row not existing) ' +
     'returns 500. NOTE: mocked, this only proves the route\'s catch works — it no longer ' +
     'proves Postgres actually rolls back the workout deletion atomically. That guarantee ' +
     'previously required a real transactional DB.', async () => {
    getSession.mockResolvedValue(buildSession(buildUser()))
    prismaMock.$transaction.mockRejectedValue(new Error('record not found'))
    const res = await deleteReq('c1')
    expect(res.status).toBe(500)
  })

  it('fault tolerance: unauthenticated delete returns 401', async () => {
    getSession.mockResolvedValue(null)
    const res = await deleteReq('c1')
    expect(res.status).toBe(401)
    expect(prismaMock.$transaction).not.toHaveBeenCalled()
  })
})