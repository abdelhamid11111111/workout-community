import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChallengePage from './page'

const push = jest.fn()
const back = jest.fn()
const session = { user: { id: 'u1' } }
const useSession = jest.fn().mockReturnValue({ data: session })

jest.mock('next/navigation', () => ({
  useParams: () => ({ title: 'Run 5k' }),
  useRouter: () => ({ push, back }),
}))

jest.mock('@/lib/auth-client', () => ({
  authClient: {
    useSession: useSession,
  },
}))

jest.mock('@/app/components/ui/challengePage/JoinedSuccessfully', () => ({
  __esModule: true,
  default: ({ challengeTitle }: any) => <div>{challengeTitle} joined</div>,
}))

describe('app/challenge/[title]/page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        json: async () => ({
          challenge: { id: 'c1', title: 'Run 5k', subtitle: 'sub', days: 7, level: 'beginner', category: 'Strength', rewardPoints: 120, active: true, description: 'desc' },
          totalUsr: 2,
          goals: ['Goal 1'],
          imgs: ['http://img.test/1.png'],
        }),
      })
      .mockResolvedValueOnce({
        json: async () => null,
      })
      .mockResolvedValueOnce({
        json: async () => ({ success: true }),
      }) as any
  })

  it('renders the challenge details and lets a logged-in user join', async () => {
    const user = userEvent.setup()
    render(<ChallengePage />)

    await waitFor(() => {
      expect(screen.getByText('Run 5k')).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /join challenge/i }))

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/mychallenges')
    })
  })
})
