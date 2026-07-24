import { render, screen } from '@testing-library/react'
import Home from './page'

jest.mock('./home/page', () => ({
  __esModule: true,
  default: () => <div>HomePageWrapper</div>,
}))

describe('app/page', () => {
  it('renders the home page wrapper', () => {
    render(<Home />)

    expect(screen.getByText('HomePageWrapper')).toBeInTheDocument()
  })
})
