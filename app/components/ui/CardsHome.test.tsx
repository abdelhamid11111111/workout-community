import { render, screen } from '@testing-library/react'
import CardsHome from './CardsHome'

describe('CardsHome', () => {
  it('renders card values when data is supplied', () => {
    render(<CardsHome challenges={3} totalPar={4} totalJoins={5} totalWorkout={6} />)

    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
  })
})
