/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'
import { POST } from './route'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import uploader from '@/lib/cloudinary'

jest.mock('@/lib/auth', () => ({ auth: { api: { signUpEmail: jest.fn() } } }))
jest.mock('@/lib/prisma', () => ({
  prisma: { user: { findUnique: jest.fn(), update: jest.fn() } },
}))
jest.mock('@/lib/cloudinary', () => ({ uploader: { upload: jest.fn() } }))

const authMock = jest.mocked(auth)
const prismaMock = jest.mocked(prisma)
const cloudinaryMock = jest.mocked(uploader)

function buildValidForm(overrides: Record<string, string> = {}) {
  const form = new FormData()
  form.append('username', overrides.username ?? 'jane_doe')
  form.append('email', overrides.email ?? 'jane@example.com')
  form.append('password', overrides.password ?? 'Password123!')
  form.append('currentLevel', 'beginner')
  form.append('workoutTime', 'Morning')
  form.append('personalGoals[]', 'weight_loss') // use a real enum value from PersonalGoals
  return form
}

describe('/api/auth/complete-signup POST', () => {
  beforeEach(() => jest.clearAllMocks())

  it('returns 400 when required fields are missing', async () => {
    const form = new FormData()
    form.append('username', 'a')

    const response = await POST(
      new NextRequest(
        new Request('http://localhost/api/auth/complete-signup', {
          method: 'POST',
          body: form,
        }),
      ),
    )

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({
      error: 'Username, email and password are required',
    })
  })

  it('returns 409 when the email already exists', async () => {
    prismaMock.user.findUnique.mockResolvedValueOnce({
      id: 'u1',
      email: 'jane@example.com',
    } as any)

    const response = await POST(
      new NextRequest(
        new Request('http://localhost/api/auth/complete-signup', {
          method: 'POST',
          body: buildValidForm(),
        }),
      ),
    )

    expect(response.status).toBe(409)
    await expect(response.json()).resolves.toEqual({
      error: 'An account with this email already exists',
    })
    expect(authMock.api.signUpEmail).not.toHaveBeenCalled()
  })

  it('returns 409 when the username already exists', async () => {
    prismaMock.user.findUnique
      .mockResolvedValueOnce(null) // email check passes
      .mockResolvedValueOnce({ id: 'u2', username: 'jane_doe' } as any) // username check fails

    const response = await POST(
      new NextRequest(
        new Request('http://localhost/api/auth/complete-signup', {
          method: 'POST',
          body: buildValidForm(),
        }),
      ),
    )

    expect(response.status).toBe(409)
    await expect(response.json()).resolves.toEqual({
      error: 'This username is already taken',
    })
    expect(authMock.api.signUpEmail).not.toHaveBeenCalled()
  })
})