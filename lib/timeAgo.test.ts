import { timeAgo } from './timeAgo'

describe('timeAgo', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('returns a human-readable string for recent times', () => {
    jest.spyOn(Date, 'now').mockReturnValue(new Date('2026-07-24T12:00:00Z').getTime())

    expect(timeAgo(new Date('2026-07-24T11:59:00Z'))).toBe('1 minute ago')
    expect(timeAgo(new Date('2026-07-24T11:00:00Z'))).toBe('1 hour ago')
    expect(timeAgo(new Date('2026-07-23T12:00:00Z'))).toBe('1 day ago')
  })

  it('returns just now for timestamps under a minute old', () => {
    jest.spyOn(Date, 'now').mockReturnValue(new Date('2026-07-24T12:00:00Z').getTime())

    expect(timeAgo(new Date('2026-07-24T11:59:59Z'))).toBe('just now')
  })
})
