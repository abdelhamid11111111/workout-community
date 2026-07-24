import { render, screen } from '@testing-library/react'
import HomePage from './page'

const authMock = { api: { getSession: jest.fn() } }

jest.mock('next/headers', () => ({ headers: jest.fn().mockResolvedValue(new Headers()) }))
jest.mock('@/lib/auth', () => ({ auth: authMock }))
jest.mock('../components/ui/homepage/HomePage', () => ({
  __esModule: true,
  default: ({ initialSession }: any) => <div>{initialSession ? 'session-present' : 'session-absent'}</div>,
}))

describe('app/home/page', () => {
  beforeEach(() => jest.clearAllMocks())

  it('passes a null session when the user is logged out', async () => {
    authMock.api.getSession.mockResolvedValue(null)

    render(await HomePage())

    expect(screen.getByText('session-absent')).toBeInTheDocument()
  })

  it('passes the session payload through to the homepage component when logged in', async () => {
    authMock.api.getSession.mockResolvedValue({
      user: { name: 'Jane', email: 'jane@example.com', profilePic: 'pic.png' },
    })

    render(await HomePage())

    expect(screen.getByText('session-present')).toBeInTheDocument()
  })
})
