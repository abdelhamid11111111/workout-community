import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignIn from './page'

const push = jest.fn()
const refresh = jest.fn()
const back = jest.fn()
const signInEmail = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push, refresh, back }),
}))

jest.mock('@/lib/auth-client', () => ({
  authClient: {
    signIn: {
      email: signInEmail,
    },
  },
}))

describe('app/sign-in/page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('submits the sign-in form and redirects on success', async () => {
    signInEmail.mockResolvedValue({ error: null })

    const user = userEvent.setup()
    render(<SignIn />)

    await user.type(screen.getByPlaceholderText('your@email.com'), 'jane@example.com')
    await user.type(screen.getByPlaceholderText('Enter your password'), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(signInEmail).toHaveBeenCalledWith({ email: 'jane@example.com', password: 'password123' })
    expect(push).toHaveBeenCalledWith('/home')
  })

  it('shows an error message when authentication fails', async () => {
    signInEmail.mockResolvedValue({ error: { message: 'Invalid email or password.' } })

    const user = userEvent.setup()
    render(<SignIn />)

    await user.type(screen.getByPlaceholderText('your@email.com'), 'jane@example.com')
    await user.type(screen.getByPlaceholderText('Enter your password'), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(screen.getByText('Invalid email or password.')).toBeInTheDocument()
  })
})
