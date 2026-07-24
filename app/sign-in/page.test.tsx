import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { authClient } from '@/lib/auth-client'

const push = jest.fn()
const refresh = jest.fn()
const back = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push, refresh, back }),
}))

// authClient global mock from jest.setup.tsx — no local jest.mock needed.

describe('app/sign-in/page', () => {
  beforeEach(() => jest.clearAllMocks())

  it('submits the sign-in form and redirects on success', async () => {
    ;(authClient.signIn.email as jest.Mock).mockResolvedValue({ error: null })

    const user = userEvent.setup()
    const { default: SignIn } = await import('./page')
    render(<SignIn />)

    await user.type(screen.getByPlaceholderText('your@email.com'), 'jane@example.com')
    await user.type(screen.getByPlaceholderText('Enter your password'), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(authClient.signIn.email as jest.Mock).toHaveBeenCalledWith({
      email: 'jane@example.com',
      password: 'password123',
    })
    expect(push).toHaveBeenCalledWith('/home')
  })

  it('shows an error message when authentication fails', async () => {
    ;(authClient.signIn.email as jest.Mock).mockResolvedValue({
      error: { message: 'Invalid email or password.' },
    })

    const user = userEvent.setup()
    const { default: SignIn } = await import('./page')
    render(<SignIn />)

    await user.type(screen.getByPlaceholderText('your@email.com'), 'jane@example.com')
    await user.type(screen.getByPlaceholderText('Enter your password'), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(screen.getByText('Invalid email or password.')).toBeInTheDocument()
  })
})
