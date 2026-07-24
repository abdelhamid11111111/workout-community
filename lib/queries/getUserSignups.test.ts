import { getUserSignupsThisWeek } from './getUserSignups'

const prismaMock = {
  user: {
    findMany: jest.fn(),
  },
}

jest.mock('@/lib/prisma', () => ({ prisma: prismaMock }))

describe('getUserSignupsThisWeek', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers().setSystemTime(new Date('2026-07-24T12:00:00Z'))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('aggregates user signups into the current week and computes stats', async () => {
    prismaMock.user.findMany.mockResolvedValue([
      { createdAt: new Date('2026-07-20T09:00:00Z') },
      { createdAt: new Date('2026-07-21T09:00:00Z') },
      { createdAt: new Date('2026-07-24T09:00:00Z') },
    ])

    await expect(getUserSignupsThisWeek()).resolves.toEqual({
      data: [
        { day: 'Mon', users: 0 },
        { day: 'Tue', users: 0 },
        { day: 'Wed', users: 0 },
        { day: 'Thu', users: 0 },
        { day: 'Fri', users: 0 },
        { day: 'Sat', users: 1 },
        { day: 'Sun', users: 2 },
      ],
      totalThisWeek: 3,
      avgPerDay: 0.4,
      peakDay: 'Sun',
    })

    expect(prismaMock.user.findMany).toHaveBeenCalledWith({
      where: { createdAt: { gte: expect.any(Date) } },
      select: { createdAt: true },
    })
  })
})
