import { prismaMock } from '../../__mocks__/prisma'
jest.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
jest.mock('@/lib/auth', () => ({ auth: { api: { getSession: jest.fn() } } }))
jest.mock('@/lib/cloudinary', () => ({
  __esModule: true,
  default: { uploader: { upload: jest.fn().mockResolvedValue({ secure_url: 'https://cloudinary.test/x.jpg' }) } },
}))

import { NextRequest } from 'next/server'
import { POST as createChallengeRoute } from '@/app/api/admin/challenges/route'
import { DELETE as deleteOne } from '@/app/api/admin/challenges/[id]/route'
import { auth } from '@/lib/auth'
import { buildUser, buildSession } from './setup/factories'

const getSession = auth.api.getSession as unknown as jest.Mock

function buildChallengeForm(overrides: Record<string, string> = {}) {
  const form = new FormData()
  const defaults: Record<string, string> = {
    title: 'Admin Challenge', description: 'Desc', subtitle: 'Sub',
    days: '14', rewardPoints: '200', category: 'Cardio', level: 'beginner',
  }
  Object.entries({ ...defaults, ...overrides }).forEach(([k, v]) => form.append(k, v))
  form.append('goals[]', 'GeneralFitness')
  form.append('images[]', new Blob([new Uint8Array(10)], { type: 'image/png' }), 'x.png')
  return form
}
const postReq = (form: FormData) => createChallengeRoute(new NextRequest(new Request('http://localhost/api/admin/challenges', { method: 'POST', body: form })))
const deleteReq = (id: string) => deleteOne(new NextRequest(new Request(`http://localhost/api/admin/challenges/${id}`, { method: 'DELETE' })), { params: Promise.resolve({ id }) })

describe('Admin challenge CRUD', () => {
  it('happy path: admin creates a challenge -> 201', async () => {
    getSession.mockResolvedValue(buildSession(buildUser({ role: 'admin' })))
    prismaMock.challenge.create.mockResolvedValue({ id: 'c1', title: 'Admin Challenge' } as never)
    const res = await postReq(buildChallengeForm())
    expect(res.status).toBe(201)
  })

  it('fault tolerance: non-admin authenticated user is rejected 401, no create attempted', async () => {
    getSession.mockResolvedValue(buildSession(buildUser({ role: 'user' })))
    const res = await postReq(buildChallengeForm())
    expect(res.status).toBe(401)
    expect(prismaMock.challenge.create).not.toHaveBeenCalled()
  })

  it('fault tolerance: unauthenticated caller is rejected 401', async () => {
    getSession.mockResolvedValue(null)
    const res = await postReq(buildChallengeForm())
    expect(res.status).toBe(401)
  })

  it('edge case: missing required field -> 400, Cloudinary never called', async () => {
    getSession.mockResolvedValue(buildSession(buildUser({ role: 'admin' })))
    const form = buildChallengeForm()
    form.delete('title')
    const res = await postReq(form)
    expect(res.status).toBe(400)
    const cloudinary = (await import('@/lib/cloudinary')).default as unknown as { uploader: { upload: jest.Mock } }
    expect(cloudinary.uploader.upload).not.toHaveBeenCalled()
  })

  it('fault tolerance: deleting a nonexistent challenge — Prisma P2025 "record not found" ' +
     'must degrade to a handled response, not a crash', async () => {
    getSession.mockResolvedValue(buildSession(buildUser({ role: 'admin' })))
    prismaMock.challenge.delete.mockRejectedValue(new Error('An operation failed because it depends on one or more records that were required but not found.'))
    const res = await deleteReq('does-not-exist')
    expect([404, 500]).toContain(res.status)
  })
})