import { GET } from './route'

const analyticsMock = {
  batchRunReports: jest.fn(),
}

jest.mock('@google-analytics/data', () => ({
  BetaAnalyticsDataClient: jest.fn().mockImplementation(() => ({
    batchRunReports: analyticsMock.batchRunReports,
  })),
}))

describe('/api/admin/analytics GET', () => {
  beforeEach(() => jest.clearAllMocks())

  it('returns a structured analytics payload', async () => {
    analyticsMock.batchRunReports.mockResolvedValue([
      {
        reports: [
          { rows: [{ metricValues: [{ value: '100' }, { value: '60' }, { value: '120' }, { value: '0.5' }] }] },
          { rows: [{ dimensionValues: [{ value: '20260720' }], metricValues: [{ value: '3' }] }] },
          { rows: [{ dimensionValues: [{ value: 'Chrome' }], metricValues: [{ value: '4' }] }] },
          { rows: [{ dimensionValues: [{ value: 'desktop' }], metricValues: [{ value: '3' }] }] },
          { rows: [{ dimensionValues: [{ value: 'FR' }], metricValues: [{ value: '3' }] }] },
          { rows: [{ dimensionValues: [{ value: '/home' }], metricValues: [{ value: '5' }] }] },
          { rows: [{ dimensionValues: [{ value: '(direct)' }], metricValues: [{ value: '2' }] }] },
        ],
      },
      {
        reports: [
          { rows: [{ dimensionValues: [{ value: '/home' }], metricValues: [{ value: '8' }] }] },
          { rows: [{ dimensionValues: [{ value: 'Organic Search' }], metricValues: [{ value: '5' }] }] },
        ],
      },
    ])

    const response = await GET()

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toMatchObject({
      cards: { totalVisitors: '100', uniqueSessions: '60', avgSession: '2m 0s', bounceRate: '50.0%' },
      graph: [{ day: 'Jul 20', visitors: 3 }],
      browsers: [{ browser: 'Chrome', count: 4, pct: 100 }],
      devices: [{ name: 'Desktop', value: 100 }],
      countries: [{ country: 'FR', count: '3', pct: '100%' }],
      topPages: [{ path: '/home', views: '5', pct: '100%' }],
      traffic: [{ name: 'Direct', value: 100 }],
    })
  })
})
