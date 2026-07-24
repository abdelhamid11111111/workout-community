import { render, screen } from '@testing-library/react'
import UsersPage from './page'

jest.mock('@/app/components/admin/SideBar', () => ({ __esModule: true, default: () => <div>Sidebar</div> }))
jest.mock('@/app/components/admin/users/Cards', () => ({ __esModule: true, default: () => <div>Cards</div> }))
jest.mock('@/app/components/admin/users/Graph', () => ({ __esModule: true, default: () => <div>Graph</div> }))
jest.mock('@/app/components/admin/users/Table', () => ({ __esModule: true, default: () => <div>Table</div> }))

describe('app/admin/users/page', () => {
  it('renders the user admin page shell', () => {
    render(<UsersPage />)

    expect(screen.getByText('Users')).toBeInTheDocument()
    expect(screen.getByText('Cards')).toBeInTheDocument()
    expect(screen.getByText('Graph')).toBeInTheDocument()
    expect(screen.getByText('Table')).toBeInTheDocument()
  })
})
