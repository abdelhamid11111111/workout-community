/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'
import { GET, PUT, DELETE } from './route'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import uploader from "@/lib/cloudinary";
import type { UploadApiResponse } from "cloudinary";

jest.mock('@/lib/auth', () => ({ auth: { api: { getSession: jest.fn() } } }))
jest.mock('@/lib/prisma', () => ({
  prisma: {
    challenge: { findUnique: jest.fn(), update: jest.fn(), delete: jest.fn() },
  },
}))
jest.mock('@/lib/cloudinary', () => ({ uploader: { upload: jest.fn() } }))

const authMock = auth as any
const prismaMock = prisma as any
const cloudinaryMock = jest.mocked(uploader);
describe('/api/admin/challenges/[id] route', () => {
  beforeEach(() => jest.clearAllMocks())

  it('returns 401 for non-admin GET requests', async () => {
    authMock.api.getSession.mockResolvedValue({ user: { role: 'user' } })

    const response = await GET(new NextRequest(new Request('http://localhost/api/admin/challenges/c1')), { params: Promise.resolve({ id: 'c1' }) } as any)

    expect(response.status).toBe(401)
    await expect(response.json()).resolves.toEqual({ error: 'Unauthorized' })
  })

  it('returns a challenge on admin GET success', async () => {
    authMock.api.getSession.mockResolvedValue({ user: { role: 'admin' } })
    prismaMock.challenge.findUnique.mockResolvedValue({ id: 'c1', title: 'Run' })

    const response = await GET(new NextRequest(new Request('http://localhost/api/admin/challenges/c1')), { params: Promise.resolve({ id: 'c1' }) } as any)

    expect(prismaMock.challenge.findUnique).toHaveBeenCalledWith({ where: { id: 'c1' } })
    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({ id: 'c1', title: 'Run' })
  })

  it('updates a challenge and returns 200 on success', async () => {
    authMock.api.getSession.mockResolvedValue({ user: { role: 'admin' } })
    prismaMock.challenge.update.mockResolvedValue({ id: 'c1', title: 'Updated' })

    const form = new FormData()
    form.append('title', 'Updated')
    form.append('existingImages[]', 'https://img.test/existing.png')

    const response = await PUT(new NextRequest(new Request('http://localhost/api/admin/challenges/c1', { method: 'PUT', body: form })), { params: Promise.resolve({ id: 'c1' }) } as any)

    expect(prismaMock.challenge.update).toHaveBeenCalledWith({
      where: { id: 'c1' },
      data: expect.objectContaining({ title: 'Updated', imgs: ['https://img.test/existing.png'] }),
    })
    expect(response.status).toBe(200)
  })

  it('returns 400 when DELETE is missing the id param', async () => {
    authMock.api.getSession.mockResolvedValue({ user: { role: 'admin' } })

    const response = await DELETE(new NextRequest(new Request('http://localhost/api/admin/challenges/c1', { method: 'DELETE' })), { params: Promise.resolve({ id: '' }) } as any)

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({ error: 'Missing id' })
  })
})
