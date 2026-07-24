import { render, screen, waitFor } from '@testing-library/react'
import CardsHome from './CardsHome'

describe('CardsHome', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        challenges: 3,
        totalPar: 4,
        totalJoins: 5,
        totalWorkout: 6,
      }),
    }) as jest.Mock
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders card values when data is supplied', async () => {
    render(<CardsHome />)

    await waitFor(() => {
      expect(screen.getByText('3')).toBeInTheDocument()
    })

    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('6')).toBeInTheDocument()
  })
})