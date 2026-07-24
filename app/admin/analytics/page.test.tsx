import { render, screen, waitFor } from '@testing-library/react'
import AnalyticsDashboard from './page'

jest.mock('@/app/components/admin/SideBar', () => ({ __esModule: true, default: () => <div>Sidebar</div> }))
jest.mock('@/app/components/admin/analytics/Cards', () => ({ __esModule: true, default: () => <div>Cards</div> }))
jest.mock('@/app/components/admin/analytics/Graph', () => ({ __esModule: true, default: () => <div>Graph</div> }))
jest.mock('@/app/components/admin/analytics/Traffic', () => ({ __esModule: true, default: () => <div>Traffic</div> }))
jest.mock('@/app/components/admin/analytics/Devices', () => ({ __esModule: true, default: () => <div>Devices</div> }))
jest.mock('@/app/components/admin/analytics/Countries', () => ({ __esModule: true, default: () => <div>Countries</div> }))
jest.mock('@/app/components/admin/analytics/TopPages', () => ({ __esModule: true, default: () => <div>TopPages</div> }))
jest.mock('@/app/components/admin/analytics/Browser', () => ({ __esModule: true, default: () => <div>Browser</div> }))

describe('app/admin/analytics/page', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
      .mockResolvedValueOnce({ json: async () => ({ cards: { totalVisitors: '1', uniqueSessions: '2', avgSession: '1m 0s', bounceRate: '0%' } }) })
      .mockResolvedValueOnce({ json: async () => ({ activeNow: 3 }) }) as any
  })

  it('renders the analytics dashboard shell after it loads data', async () => {
    render(<AnalyticsDashboard />)

    await waitFor(() => {
      expect(screen.getByText('Visitor Analytics')).toBeInTheDocument()
    })

    expect(screen.getByText('Cards')).toBeInTheDocument()
    expect(screen.getByText('Graph')).toBeInTheDocument()
  })
})
