import { render, screen } from '@testing-library/react'
import { auth } from '@/lib/auth'

jest.mock('next/headers', () => ({ headers: jest.fn().mockResolvedValue(new Headers()) }))

jest.mock('@/lib/auth', () => ({
  auth: { api: { getSession: jest.fn() } },
}))

jest.mock('../components/ui/homepage/HomePage', () => ({
  __esModule: true,
  default: ({ initialSession }: any) => <div>{initialSession ? 'session-present' : 'session-absent'}</div>,
}))

describe('app/home/page', () => {
  beforeEach(() => jest.clearAllMocks())

  it('passes a null session when the user is logged out', async () => {
    ;(auth.api.getSession as jest.Mock).mockResolvedValue(null)

    const { default: HomePage } = await import('./page')
    render(await HomePage())

    expect(screen.getByText('session-absent')).toBeInTheDocument()
  })

  it('passes the session payload through to the homepage component when logged in', async () => {
    ;(auth.api.getSession as jest.Mock).mockResolvedValue({
      user: { name: 'Jane', email: 'jane@example.com', profilePic: 'pic.png' },
    })

    const { default: HomePage } = await import('./page')
    render(await HomePage())

    expect(screen.getByText('session-present')).toBeInTheDocument()
  })
})
