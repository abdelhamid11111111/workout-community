import { render, screen } from '@testing-library/react'
import Challenges from './Challenges'

describe('Challenges', () => {
  it('renders the challenge section', () => {
    render(<Challenges />)

    expect(screen.getByText(/challenge/i)).toBeInTheDocument()
  })
})
