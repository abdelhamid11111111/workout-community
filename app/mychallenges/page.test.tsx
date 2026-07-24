import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MyChallenges from './page'

jest.mock('../components/ui/CardsChallenges', () => ({
  __esModule: true,
  default: ({ countActive, countCompleted }: any) => <div>{countActive}-{countCompleted}</div>,
}))

jest.mock('../components/ui/ChallengeCardSkeleton', () => ({
  __esModule: true,
  default: () => <div>Skeleton</div>,
}))

jest.mock('../components/ui/ChallengeCard', () => ({
  __esModule: true,
  default: ({ userChallenge, onDelete }: any) => (
    <button onClick={() => onDelete(userChallenge.challenge.id)}>{userChallenge.challenge.title}</button>
  ),
}))

describe('app/mychallenges/page', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  it('shows the empty state when there are no joined challenges', async () => {
    global.fetch = jest.fn().mockResolvedValue({ json: async () => [] }) as any

    render(<MyChallenges />)

    expect(await screen.findByText('No Active Challenges')).toBeInTheDocument()
  })

  it('switches between active and completed tabs', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => [
        {
          isActive: true,
          isCompleted: false,
          challenge: { id: 'c1', title: 'Active challenge', days: 7 },
          joinedAt: '2026-07-01',
          workoutCount: 1,
        },
        {
          isActive: false,
          isCompleted: true,
          challenge: { id: 'c2', title: 'Completed challenge', days: 7 },
          joinedAt: '2026-07-01',
          workoutCount: 7,
        },
      ],
    }) as any

    const user = userEvent.setup()
    render(<MyChallenges />)

    expect(await screen.findByText('Active challenge')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Completed' }))
    expect(screen.getByText('Completed challenge')).toBeInTheDocument()
  })
})
