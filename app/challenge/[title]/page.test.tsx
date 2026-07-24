import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { authClient } from '@/lib/auth-client'

// 1. Mock next/image to strip the 'fill' prop and resolve the console error
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { fill, ...rest } = props;
    return <img {...rest} />;
  },
}))

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
      // Mock 1: Initial challenge details fetch
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
      // Mock 2: is-joined check
      // We return null so `UserChallenge && session` evaluates to falsy. 
      // The `finally` block in your useEffect will still correctly resolve the loading state.
      .mockResolvedValueOnce({ 
        json: async () => null 
      })
      // Mock 3: The actual handleJoin POST request
      // We must include `ok: true` because your component checks `if (res.ok)`
      .mockResolvedValueOnce({ 
        ok: true, 
        json: async () => ({ success: true }) 
      }) as any
  })

  it('renders the challenge details and lets a logged-in user join', async () => {
    const user = userEvent.setup()
    const { default: ChallengePage } = await import('./page')
    render(<ChallengePage />)

    // Wait for the challenge details to load
    await waitFor(() => {
      expect(screen.getByText('Run 5k')).toBeInTheDocument()
    })

    // Wait for the is-joined check to resolve and the button to become active
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /join challenge/i })).toBeInTheDocument()
    })

    // Click the join button
    await user.click(screen.getByRole('button', { name: /join challenge/i }))

    // Wait for the success modal to appear
    await waitFor(() => {
      expect(screen.getByText('Run 5k joined')).toBeInTheDocument()
    })
  })
})