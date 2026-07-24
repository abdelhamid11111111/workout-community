import { render, screen } from '@testing-library/react'
import LoadingState from './LoadingState'

describe('LoadingState', () => {
  it('renders the loading message', () => {
    render(<LoadingState message="Loading data" />)

    expect(screen.getByText('Loading data')).toBeInTheDocument()
  })
})
