/**
 * @jest-environment node
 */

// The mock fn is created INSIDE the factory, so it exists at the moment
// route.ts is imported and instantiates `new BetaAnalyticsDataClient()`
// at module scope. A top-level `const` in this file would still be in
// its temporal dead zone at that point, which is what caused the
// "Cannot access before initialization" error.
jest.mock('@google-analytics/data', () => {
  const mockRunRealtimeReport = jest.fn()
  return {
    BetaAnalyticsDataClient: jest.fn().mockImplementation(() => ({
      runRealtimeReport: mockRunRealtimeReport,
    })),
    mockRunRealtimeReport,
  }
})

import { GET } from './route'

const { mockRunRealtimeReport } = jest.requireMock('@google-analytics/data') as {
  mockRunRealtimeReport: jest.Mock
}

describe('/api/admin/analytics/realtime GET', () => {
  beforeEach(() => jest.clearAllMocks())

  it('returns the realtime active user count', async () => {
    mockRunRealtimeReport.mockResolvedValue([
      { rows: [{ metricValues: [{ value: '12' }] }] },
    ])

    const response = await GET()

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({ activeNow: 12 })
  })

  it('returns 500 when the GA client throws', async () => {
    mockRunRealtimeReport.mockRejectedValue(new Error('boom'))

    const response = await GET()

    expect(response.status).toBe(500)
    await expect(response.json()).resolves.toEqual({ error: 'Failed to fetch realtime data' })
  })
})