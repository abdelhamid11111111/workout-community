import { render, screen } from '@testing-library/react'
import Dashboard from './page'

jest.mock('@/app/components/admin/dashboard/AvgCalories', () => ({ __esModule: true, default: () => <div>AvgCalories</div> }))
jest.mock('@/app/components/admin/dashboard/Cards', () => ({ __esModule: true, default: () => <div>Cards</div> }))
jest.mock('@/app/components/admin/dashboard/CategoriesData', () => ({ __esModule: true, default: () => <div>CategoriesData</div> }))
jest.mock('@/app/components/admin/dashboard/Graph', () => ({ __esModule: true, default: () => <div>Graph</div> }))
jest.mock('@/app/components/admin/dashboard/Intensity', () => ({ __esModule: true, default: () => <div>Intensity</div> }))
jest.mock('@/app/components/admin/dashboard/Post-Workout', () => ({ __esModule: true, default: () => <div>PostWorkout</div> }))
jest.mock('@/app/components/admin/dashboard/TopChall', () => ({ __esModule: true, default: () => <div>TopChall</div> }))
jest.mock('@/app/components/admin/dashboard/UsrLevel', () => ({ __esModule: true, default: () => <div>UsrLevel</div> }))
jest.mock('@/app/components/admin/dashboard/WorkoutTime', () => ({ __esModule: true, default: () => <div>WorkoutTime</div> }))
jest.mock('@/app/components/admin/SideBar', () => ({ __esModule: true, default: () => <div>Sidebar</div> }))
jest.mock('@/lib/queries/getUserJoins', () => ({ getUserJoinsThisWeek: jest.fn().mockResolvedValue({ data: [] }) }))

describe('app/admin/dashboard/page', () => {
  it('renders the dashboard shell', async () => {
    render(await Dashboard())

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Cards')).toBeInTheDocument()
    expect(screen.getByText('AvgCalories')).toBeInTheDocument()
  })
})
