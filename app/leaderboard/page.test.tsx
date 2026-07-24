import { render, screen, waitFor } from '@testing-library/react'
import Leaderboard from './page'

describe('app/leaderboard/page', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  it('renders the empty leaderboard state when no users are returned', async () => {
    global.fetch = jest.fn().mockResolvedValue({ json: async () => ({ data: [] }) }) as any

    render(<Leaderboard />)

    await waitFor(() => {
      expect(screen.getByText('No users on the leaderboard yet.')).toBeInTheDocument()
    })
  })

  it('renders the top ranked users when scores are present', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({
        data: [
          { id: '1', name: 'Jane', email: 'jane@example.com', currentLevel: 'beginner', profilePic: null, _count: { workouts: 2, challenges: 1 } },
          { id: '2', name: 'John', email: 'john@example.com', currentLevel: 'intermediate', profilePic: null, _count: { workouts: 1, challenges: 1 } },
        ],
      }),
    }) as any

    render(<Leaderboard />)

    await waitFor(() => {
      expect(screen.getByText('Community Leaderboard')).toBeInTheDocument()
      expect(screen.getAllByText('Jane')[0]).toBeInTheDocument()
      expect(screen.getAllByText('John')[0]).toBeInTheDocument()
    })
  })
})
