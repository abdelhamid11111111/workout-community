import { GET } from './route'

const analyticsMock = {
  runRealtimeReport: jest.fn(),
}

jest.mock('@google-analytics/data', () => ({
  BetaAnalyticsDataClient: jest.fn().mockImplementation(() => ({
    runRealtimeReport: analyticsMock.runRealtimeReport,
  })),
}))

describe('/api/admin/analytics/realtime GET', () => {
  beforeEach(() => jest.clearAllMocks())

  it('returns the realtime active user count', async () => {
    analyticsMock.runRealtimeReport.mockResolvedValue([
      { rows: [{ metricValues: [{ value: '12' }] }] },
    ])

    const response = await GET()

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({ activeNow: 12 })
  })

  it('returns 500 when the GA client throws', async () => {
    analyticsMock.runRealtimeReport.mockRejectedValue(new Error('boom'))

    const response = await GET()

    expect(response.status).toBe(500)
    await expect(response.json()).resolves.toEqual({ error: 'Failed to fetch realtime data' })
  })
})
