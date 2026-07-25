import { prismaMock } from '../../__mocks__/prisma'
jest.mock('@/lib/prisma', () => ({ prisma: prismaMock }))

import { GET as homepageCards } from '@/app/api/homepage/cards/route'
import { GET as featuredChallenges } from '@/app/api/homepage/FeaturedChallenge/route'
import { buildChallenge } from './setup/factories'

describe('Homepage aggregates', () => {
  it('happy path: assembles counts from four independent Prisma calls', async () => {
    prismaMock.challenge.count.mockResolvedValue(2)
    prismaMock.userChallenge.findMany.mockResolvedValue([{ userId: 'u1' }] as never)
    prismaMock.userChallenge.count.mockResolvedValue(3)
    prismaMock.workout.count.mockResolvedValue(5)

    const res = await homepageCards()
    const body = await res.json()
    expect(body).toEqual({ challenges: 2, totalPar: 1, totalJoins: 3, totalWorkout: 5 })
  })

  it('fault tolerance: any one of the four queries failing degrades to 400 (route\'s own choice), not a crash', async () => {
    prismaMock.challenge.count.mockRejectedValue(new Error('db down'))
    const res = await homepageCards()
    expect(res.status).toBe(400)
  })

  it('happy path: featured challenges returns whatever Prisma\'s `take: 3` gives back', async () => {
    prismaMock.challenge.findMany.mockResolvedValue([buildChallenge(), buildChallenge(), buildChallenge()] as never)
    const res = await featuredChallenges()
    expect(await res.json()).toHaveLength(3)
  })

  it('fault tolerance: empty result set returns an empty array, not an error', async () => {
    prismaMock.challenge.findMany.mockResolvedValue([])
    const res = await featuredChallenges()
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual([])
  })
})