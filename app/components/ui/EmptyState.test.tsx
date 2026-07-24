import { render, screen } from '@testing-library/react'
import EmptyState from './EmptyState'

describe('EmptyState', () => {
  it('renders the empty title and supporting copy', () => {
    render(<EmptyState title="No items" description="Nothing to show" />)

    expect(screen.getByText('No items')).toBeInTheDocument()
    expect(screen.getByText('Nothing to show')).toBeInTheDocument()
  })
})
