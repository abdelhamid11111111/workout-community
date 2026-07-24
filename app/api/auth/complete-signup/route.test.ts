/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'
import { POST } from './route'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

jest.mock('@/lib/auth', () => ({ auth: { api: { signUpEmail: jest.fn() } } }))
jest.mock('@/lib/prisma', () => ({
  prisma: { user: { findUnique: jest.fn(), update: jest.fn() } },
}))
jest.mock('@/lib/cloudinary', () => ({ uploader: { upload: jest.fn() } }))

const authMock = auth as any
const prismaMock = prisma as any
const cloudinaryMock = require('@/lib/cloudinary') as any
describe('/api/auth/complete-signup POST', () => {
  beforeEach(() => jest.clearAllMocks())

  it('returns 400 when required fields are missing', async () => {
    const form = new FormData()
    form.append('username', 'a')

    const response = await POST(new NextRequest(new Request('http://localhost/api/auth/complete-signup', { method: 'POST', body: form })))

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({ error: 'Username, email and password are required' })
  })

  it('returns 409 when the email or username already exists', async () => {
    const form = new FormData()
    form.append('username', 'jane_doe')
    form.append('email', 'jane@example.com')
    form.append('password', 'password123')
    form.append('currentLevel', 'beginner')
    form.append('workoutTime', 'Morning')
    form.append('personalGoals[]', 'Strength')
    prismaMock.user.findUnique.mockResolvedValue({ id: 'u1' })

    const response = await POST(new NextRequest(new Request('http://localhost/api/auth/complete-signup', { method: 'POST', body: form })))

    expect(response.status).toBe(409)
    await expect(response.json()).resolves.toEqual({ error: 'An account with this email already exists' })
  })

  it('creates a user and returns 201 on success', async () => {
    const form = new FormData()
    form.append('username', 'jane_doe')
    form.append('email', 'jane@example.com')
    form.append('password', 'password123')
    form.append('currentLevel', 'beginner')
    form.append('workoutTime', 'Morning')
    form.append('personalGoals[]', 'Strength')

    prismaMock.user.findUnique.mockResolvedValue(null)
    authMock.api.signUpEmail.mockResolvedValue({
      ok: true,
      json: async () => ({ user: { id: 'u1' } }),
      headers: new Headers({ 'set-cookie': 'session=abc' }),
    })
    prismaMock.user.update.mockResolvedValue({ id: 'u1', username: 'jane_doe', email: 'jane@example.com' })

    const response = await POST(new NextRequest(new Request('http://localhost/api/auth/complete-signup', { method: 'POST', body: form })))

    expect(response.status).toBe(201)
    await expect(response.json()).resolves.toMatchObject({ user: { id: 'u1' } })
  })
})
