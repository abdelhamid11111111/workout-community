import { render, screen } from '@testing-library/react'
import HomePage from './HomePage'

describe('app/components/ui/homepage/HomePage', () => {
  it('renders the homepage shell', () => {
    render(<HomePage initialSession={null} />)

    expect(screen.getByText(/challenges/i)).toBeInTheDocument()
  })
})
