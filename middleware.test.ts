/**
 * @jest-environment node
 */
import { NextRequest, NextResponse } from 'next/server'
import { middleware } from './middleware'
import { auth } from './lib/auth'
import { getSessionCookie } from 'better-auth/cookies'

jest.mock('./lib/auth', () => ({
  auth: { api: { getSession: jest.fn() } },
}))

jest.mock('better-auth/cookies', () => ({
  getSessionCookie: jest.fn(),
}))

const authMock = jest.mocked(auth)
const getSessionCookieMock = jest.mocked(getSessionCookie)

type Session = Awaited<ReturnType<typeof auth.api.getSession>>

function makeSession(overrides: { role?: string } = {}): Session {
  return {
    user: {
      id: 'u1',
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'test@example.com',
      emailVerified: true,
      name: 'Test User',
      image: null,
      username: 'testuser',
      profilePic: null,
      banned: false,
      role: overrides.role ?? 'user',
      banReason: null,
    },
  } as Session
}

const makeRequest = (pathname: string) =>
  new NextRequest(new Request(`http://localhost${pathname}`))

describe('middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('redirects unauthenticated users away from protected routes', async () => {
    getSessionCookieMock.mockReturnValue(null)

    const response = await middleware(makeRequest('/mychallenges'))

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe('http://localhost/sign-in')
  })

  it('redirects non-admins away from admin routes', async () => {
    getSessionCookieMock.mockReturnValue('fake-session-token')
    authMock.api.getSession.mockResolvedValue(makeSession({ role: 'user' }))

    const response = await middleware(makeRequest('/admin/dashboard'))

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe('http://localhost/admin')
  })

  it('allows admin users through admin routes', async () => {
    getSessionCookieMock.mockReturnValue('fake-session-token')
    authMock.api.getSession.mockResolvedValue(makeSession({ role: 'admin' }))

    const response = await middleware(makeRequest('/admin/dashboard'))

    expect(response.status).toBe(200)
  })
})