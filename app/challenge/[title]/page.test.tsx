import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { authClient } from '@/lib/auth-client'

jest.mock('next/navigation', () => ({
  useParams: () => ({ title: 'Run 5k' }),
  useRouter: () => ({ push: jest.fn(), back: jest.fn() }),
}))

jest.mock('@/app/components/ui/challengePage/JoinedSuccessfully', () => ({
  __esModule: true,
  default: ({ challengeTitle }: any) => <div>{challengeTitle} joined</div>,
}))

// authClient.useSession is mocked globally in jest.setup.tsx

describe('app/challenge/[title]/page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(authClient.useSession as jest.Mock).mockReturnValue({
      data: { user: { id: 'u1' } },
    })
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        json: async () => ({
          challenge: {
            id: 'c1',
            title: 'Run 5k',
            subtitle: 'sub',
            days: 7,
            level: 'beginner',
            category: 'Strength',
            rewardPoints: 120,
            active: true,
            description: 'desc',
          },
          totalUsr: 2,
          goals: ['Goal 1'],
          imgs: ['http://img.test/1.png'],
        }),
      })
      .mockResolvedValueOnce({ json: async () => null })
      .mockResolvedValueOnce({ json: async () => ({ success: true }) }) as any
  })

  it('renders the challenge details and lets a logged-in user join', async () => {
    const user = userEvent.setup()
    const { default: ChallengePage } = await import('./page')
    render(<ChallengePage />)

    await waitFor(() => {
      expect(screen.getByText('Run 5k')).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /join challenge/i }))

    await waitFor(() => {
      expect(screen.getByText('Run 5k joined')).toBeInTheDocument()
    })
  })
})
