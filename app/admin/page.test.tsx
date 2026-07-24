import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { authClient } from '@/lib/auth-client'

const push = jest.fn()
const refresh = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push, refresh }),
}))

// Global mock from jest.setup.tsx provides authClient.signIn.email and authClient.signOut
// No need to re-declare jest.mock here — just override per test.

describe('app/admin/page', () => {
  beforeEach(() => jest.clearAllMocks())

  it('rejects non-admin users', async () => {
    ;(authClient.signIn.email as jest.Mock).mockResolvedValue({
      data: { user: { role: 'user' } },
      error: null,
    })
    ;(authClient.signOut as jest.Mock).mockResolvedValue({})

    const user = userEvent.setup()
    const { default: AdminAuth } = await import('./page')
    render(<AdminAuth />)

    await user.type(screen.getByPlaceholderText('isaac@neotone.ma'), 'test@example.com')
    await user.type(screen.getByPlaceholderText('••••••••••••'), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(screen.getByText('This account does not have admin access.')).toBeInTheDocument()
    expect(authClient.signOut as jest.Mock).toHaveBeenCalled()
  })
})
