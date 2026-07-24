/**
 * @jest-environment node
 */
import { NextRequest, NextResponse } from 'next/server'
import { middleware } from './middleware'
import { auth } from './lib/auth'

jest.mock('./lib/auth', () => ({ auth: { api: { getSession: jest.fn() } } }))

const authMock = auth as any

const makeRequest = (pathname: string) =>
  new NextRequest(new Request(`http://localhost${pathname}`))
describe('middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('redirects unauthenticated users away from protected routes', async () => {
    const response = await middleware(makeRequest('/mychallenges'))

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe('http://localhost/sign-in')
  })

  it('redirects non-admins away from admin routes', async () => {
    const req = makeRequest('/admin/dashboard')
    const sessionCookie = { user: { id: 'u1' } }
    ;(global as any).cookies = sessionCookie

    authMock.api.getSession.mockResolvedValue({ user: { role: 'user' } })
    const response = await middleware(req)

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe('http://localhost/admin')
  })

  it('allows admin users through admin routes', async () => {
    const req = makeRequest('/admin/dashboard')

    authMock.api.getSession.mockResolvedValue({ user: { role: 'admin' } })
    const response = await middleware(req)

    expect(response.status).toBe(200)
  })
})
