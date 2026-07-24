import { render, screen } from '@testing-library/react'
import FeaturedChallenge from './FeaturedChallenge'

describe('FeaturedChallenge', () => {
  it('renders the featured challenge heading', () => {
    render(<FeaturedChallenge />)

    expect(screen.getByText(/featured/i)).toBeInTheDocument()
  })
})
