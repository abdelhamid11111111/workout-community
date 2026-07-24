import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignUpFlow from './page'

const push = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push, refresh: jest.fn(), back: jest.fn() }),
}))

jest.mock('../components/ui/createAcc/SignUp', () => ({
  __esModule: true,
  default: ({ username, setUsername, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, agreedToTerms, setAgreedToTerms }: any) => (
    <div>
      <input aria-label="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input aria-label="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input aria-label="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input aria-label="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <input aria-label="agreedToTerms" type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} />
    </div>
  ),
}))

jest.mock('../components/ui/createAcc/OnBoardingProfile', () => ({
  __esModule: true,
  default: () => <div>Onboarding form</div>,
}))

jest.mock('../components/ui/createAcc/CreatedSuccessfully', () => ({
  __esModule: true,
  default: () => <div>Created successfully</div>,
}))

jest.mock('../components/ui/createAcc/FailedToCreateAcc', () => ({
  __esModule: true,
  default: ({ message }: any) => <div>{message || 'failed'}</div>,
}))

describe('app/sign-up/page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ user: { id: 'u1' } }) }) as any
  })

  it('moves through the basic sign-up flow and renders the onboarding step', async () => {
    const user = userEvent.setup()
    render(<SignUpFlow />)

    await user.type(screen.getByLabelText('username'), 'jane_doe')
    await user.type(screen.getByLabelText('email'), 'jane@example.com')
    await user.type(screen.getByLabelText('password'), 'password123')
    await user.type(screen.getByLabelText('confirmPassword'), 'password123')
    await user.click(screen.getByRole('button', { name: /create account/i }))

    expect(screen.getByText('Onboarding form')).toBeInTheDocument()
  })
})
