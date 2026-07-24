import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  it('renders the footer content', () => {
    render(<Footer />)

    expect(screen.getByText(/community/i)).toBeInTheDocument()
  })
})
