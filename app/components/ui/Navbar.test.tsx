import { render, screen } from '@testing-library/react'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('renders the navigation links', () => {
    render(<Navbar />)

    expect(screen.getByText(/home/i)).toBeInTheDocument()
    expect(screen.getByText(/leaderboard/i)).toBeInTheDocument()
  })
})
