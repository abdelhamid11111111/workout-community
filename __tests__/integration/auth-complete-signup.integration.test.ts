import { prismaMock } from '../../__mocks__/prisma'
jest.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
jest.mock('@/lib/auth', () => ({ auth: { api: { signUpEmail: jest.fn() } } }))

jest.mock('@/lib/cloudinary', () => ({
  __esModule: true,
  default: { uploader: { upload: jest.fn().mockResolvedValue({ secure_url: 'https://cloudinary.test/x.jpg' }) } },
}))

import { NextRequest } from 'next/server'
import { POST as completeSignup } from '@/app/api/auth/complete-signup/route'
import { auth } from '@/lib/auth'
import { buildUser } from './setup/factories'

const signUpEmail = auth.api.signUpEmail as unknown as jest.Mock

function buildForm(overrides: Record<string, string> = {}) {
  const form = new FormData()
  const defaults: Record<string, string> = {
    username: 'validuser', email: 'valid@example.test', password: 'ValidPassw0rd!',
    currentLevel: 'beginner', workoutTime: 'Morning',
  }
  Object.entries({ ...defaults, ...overrides }).forEach(([k, v]) => form.append(k, v))
  form.append('personalGoals[]', 'WeightLoss')
  return form
}
const request = (form: FormData) => completeSignup(new NextRequest(new Request('http://localhost/api/auth/complete-signup', { method: 'POST', body: form })))

describe('POST /api/auth/complete-signup', () => {
  it('happy path: valid signup creates account and forwards better-auth\'s cookie', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null) // no existing email/username
    const user = buildUser()
    signUpEmail.mockResolvedValue({
      ok: true,
      json: async () => ({ user }),
      headers: new Headers({ 'set-cookie': 'better-auth.session_token=abc; Path=/' }),
    })
    prismaMock.user.update.mockResolvedValue({ ...user, currentLevel: 'beginner' } as never)

    const res = await request(buildForm())
    expect(res.status).toBe(201)
    expect(res.headers.get('set-cookie')).toContain('better-auth.session_token')
  })

  it.each([
    ['missing username', { username: '' }],
    ['username too short', { username: 'ab' }],
    ['invalid email', { email: 'not-an-email' }],
    ['password too short', { password: 'short' }],
    ['invalid currentLevel', { currentLevel: 'godlike' }],
  ])('edge case: %s -> 400 before any DB or auth call', async (_label, overrides) => {
    const res = await request(buildForm(overrides))
    expect(res.status).toBe(400)
    expect(signUpEmail).not.toHaveBeenCalled()
  })

  it('fault tolerance: duplicate email -> 409, better-auth never invoked', async () => {
    prismaMock.user.findUnique.mockResolvedValueOnce({ id: 'existing' } as never)
    const res = await request(buildForm())
    expect(res.status).toBe(409)
    expect(signUpEmail).not.toHaveBeenCalled()
  })

  it('fault tolerance: better-auth rejects the signup (e.g. its own internal duplicate check) -> forwarded status', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null)
    signUpEmail.mockResolvedValue({ ok: false, status: 422, json: async () => ({ message: 'weak password' }) })
    const res = await request(buildForm())
    expect(res.status).toBe(422)
  })

  it('fault tolerance: a failing Cloudinary upload must NOT fail the whole signup', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null)
    const user = buildUser()
    signUpEmail.mockResolvedValue({ ok: true, json: async () => ({ user }), headers: new Headers() })
    prismaMock.user.update.mockResolvedValue({ ...user, profilePic: null } as never)
    const cloudinary = (await import('@/lib/cloudinary')).default as unknown as { uploader: { upload: jest.Mock } }
    cloudinary.uploader.upload.mockRejectedValueOnce(new Error('cloudinary down'))

    const form = buildForm()
    form.append('profilePic', new Blob([new Uint8Array(10)], { type: 'image/png' }), 'ok.png')
    const res = await request(form)
    expect(res.status).toBe(201)
  })

  it('fault tolerance: oversized profile picture rejected 400 before Cloudinary is called', async () => {
    const form = buildForm()
    form.append('profilePic', new Blob([new Uint8Array(6 * 1024 * 1024)], { type: 'image/png' }), 'huge.png')
    const res = await request(form)
    expect(res.status).toBe(400)
    const cloudinary = (await import('@/lib/cloudinary')).default as unknown as { uploader: { upload: jest.Mock } }
    expect(cloudinary.uploader.upload).not.toHaveBeenCalled()
  })
})