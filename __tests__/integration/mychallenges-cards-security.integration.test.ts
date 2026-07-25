import { prismaMock } from '../../__mocks__/prisma'
jest.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
jest.mock('@/lib/auth', () => ({ auth: { api: { getSession: jest.fn() } } }))
jest.mock('next/headers', () => ({ headers: jest.fn().mockResolvedValue(new Headers()) }))

import { GET as cardsChallenges } from '@/app/api/mychallenges/CardsChallenges/route'
import { auth } from '@/lib/auth'
import { buildUser, buildSession } from './setup/factories'

const getSession = auth.api.getSession as unknown as jest.Mock

describe('GET /api/mychallenges/CardsChallenges', () => {
  it('happy path: sums reward points and calories for the authenticated user', async () => {
    getSession.mockResolvedValue(buildSession(buildUser()))
    prismaMock.userChallenge.findMany.mockResolvedValue([{ challenge: { rewardPoints: 150 } }] as never)
    prismaMock.workout.findMany.mockResolvedValue([{ caloriesBurned: 250 }] as never)

    const res = await cardsChallenges()
    const body = await res.json()
    expect(body).toEqual({ totalRewardPoints: 150, totalCaloriesBurned: 250 })
  })

  it('FLAGS A REAL BUG: this route never checks `if (!session)`. With no session, ' +
     '`userId` is undefined, and Prisma\'s `where: { userId: undefined }` means "no filter", ' +
     'not "match nothing" — so it would leak every user\'s totals combined. This test simulates ' +
     'exactly that Prisma call and documents current (unsafe) 200 behavior. Fix: add the same ' +
     '`if (!session) return 401` guard every sibling route already has.', async () => {
    getSession.mockResolvedValue(null)
    prismaMock.userChallenge.findMany.mockResolvedValue([{ challenge: { rewardPoints: 999 } }] as never) // "all users" data
    prismaMock.workout.findMany.mockResolvedValue([])

    const res = await cardsChallenges()
    expect(res.status).toBe(200) // should be 401 once fixed
    expect((await res.json()).totalRewardPoints).toBe(999)
  })

  it('edge case: null caloriesBurned values are excluded from the sum, not NaN', async () => {
    getSession.mockResolvedValue(buildSession(buildUser()))
    prismaMock.userChallenge.findMany.mockResolvedValue([])
    prismaMock.workout.findMany.mockResolvedValue([{ caloriesBurned: null }] as never)
    const res = await cardsChallenges()
    const body = await res.json()
    expect(body.totalCaloriesBurned).toBe(0)
  })
})