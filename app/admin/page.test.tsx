import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AdminAuth from './page'

const push = jest.fn()
const refresh = jest.fn()
const signInEmail = jest.fn()
const signOut = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push, refresh }),
}))

jest.mock('@/lib/auth-client', () => ({
  authClient: {
    signIn: { email: signInEmail },
    signOut,
  },
}))

describe('app/admin/page', () => {
  beforeEach(() => jest.clearAllMocks())

  it('rejects non-admin users', async () => {
    signInEmail.mockResolvedValue({ data: { user: { role: 'user' } }, error: null })
    const user = userEvent.setup()

    render(<AdminAuth />)

    await user.type(screen.getByPlaceholderText('isaac@neotone.ma'), 'test@example.com')
    await user.type(screen.getByPlaceholderText('••••••••••••'), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(screen.getByText('This account does not have admin access.')).toBeInTheDocument()
    expect(signOut).toHaveBeenCalled()
  })
})
