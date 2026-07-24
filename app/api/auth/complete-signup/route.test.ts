import { NextRequest } from 'next/server'
import { POST } from './route'

const authMock = {
  api: {
    signUpEmail: jest.fn(),
  },
}

const prismaMock = {
  user: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
}

const cloudinaryMock = {
  uploader: {
    upload: jest.fn(),
  },
}

jest.mock('@/lib/auth', () => ({ auth: authMock }))
jest.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
jest.mock('@/lib/cloudinary', () => cloudinaryMock)

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
