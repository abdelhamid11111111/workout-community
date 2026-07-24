import { getUserJoinsThisWeek } from './getUserJoins'
import { prisma } from '@/lib/prisma'

jest.mock('@/lib/prisma', () => ({
  prisma: {
    userChallenge: {
      findMany: jest.fn(),
    },
  },
}))

const prismaMock = prisma as unknown as {
  userChallenge: { findMany: jest.Mock }
}

describe('getUserJoinsThisWeek', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers().setSystemTime(new Date('2026-07-24T12:00:00Z'))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('aggregates joins across this and last week and calculates comparison stats', async () => {
    prismaMock.userChallenge.findMany.mockResolvedValue([
      { joinedAt: new Date('2026-07-21T09:00:00Z') },
      { joinedAt: new Date('2026-07-22T09:00:00Z') },
      { joinedAt: new Date('2026-07-23T09:00:00Z') },
      { joinedAt: new Date('2026-07-17T09:00:00Z') },
    ])

    await expect(getUserJoinsThisWeek()).resolves.toEqual({
      data: [
        { day: 'Mon', joins: 0 },
        { day: 'Tue', joins: 0 },
        { day: 'Wed', joins: 0 },
        { day: 'Thu', joins: 0 },
        { day: 'Fri', joins: 0 },
        { day: 'Sat', joins: 1 },
        { day: 'Sun', joins: 2 },
      ],
      totalJoins: 3,
      avgPerDay: 0.4,
      vsLastWeek: 200,
    })

    expect(prismaMock.userChallenge.findMany).toHaveBeenCalledWith({
      where: { joinedAt: { gte: expect.any(Date) } },
      select: { joinedAt: true },
    })
  })
})
