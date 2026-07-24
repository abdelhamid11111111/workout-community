import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChallengeCard from './ChallengeCard'

const onDelete = jest.fn()

global.fetch = jest.fn().mockResolvedValue({ json: async () => ({ currentStreak: 2 }) }) as any

jest.mock('./ProgressBar', () => ({
  __esModule: true,
  default: ({ progress }: any) => <div>{progress}%</div>,
}))

jest.mock('./LiveTimeAgo', () => ({
  __esModule: true,
  LiveTimeAgo: ({ date }: any) => <span>{date}</span>,
}))

describe('ChallengeCard', () => {
  it('renders the challenge details and calls the delete handler', async () => {
    const user = userEvent.setup()
    render(
      <ChallengeCard
        userChallenge={{
          challenge: {
            id: 'c1',
            title: 'Run 5k',
            category: 'Strength',
            level: 'beginner',
            days: 7,
            imgs: ['https://img.test/1.png'],
          },
          workoutCount: 3,
          joinedAt: '2026-07-20T00:00:00Z',
          isCompleted: false,
          isActive: true,
        } as any}
        onDelete={onDelete}
      />,
    )

    expect(screen.getByText('Run 5k')).toBeInTheDocument()
    expect(screen.getAllByText('43%')[0]).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /leave challenge/i }))

    expect(global.fetch).toHaveBeenCalledWith('/api/workout/c1', { method: 'DELETE' })
  })
})
