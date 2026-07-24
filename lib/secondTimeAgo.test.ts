import { daysRemaining } from './secondTimeAgo'

describe('daysRemaining', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('returns the remaining days and clamps at zero', () => {
    jest.spyOn(Date, 'now').mockReturnValue(new Date('2026-07-24T12:00:00Z').getTime())

    expect(daysRemaining(new Date('2026-07-20T12:00:00Z'), 5)).toBe(4)
    expect(daysRemaining(new Date('2026-07-10T12:00:00Z'), 5)).toBe(0)
  })
})
