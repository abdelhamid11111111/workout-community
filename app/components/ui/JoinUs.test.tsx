import { render, screen } from '@testing-library/react'
import JoinUs from './JoinUs'

describe('JoinUs', () => {
  it('renders the join us copy', () => {
    render(<JoinUs />)

    expect(screen.getByText(/join/i)).toBeInTheDocument()
  })
})
