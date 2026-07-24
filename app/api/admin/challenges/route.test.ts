import { NextRequest } from 'next/server'
import { GET, POST } from './route'

const authMock = { api: { getSession: jest.fn() } }
const prismaMock = {
  challenge: {
    create: jest.fn(),
    count: jest.fn(),
    findMany: jest.fn(),
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

describe('/api/admin/challenges routes', () => {
  beforeEach(() => jest.clearAllMocks())

  it('returns 401 for non-admin POST requests', async () => {
    authMock.api.getSession.mockResolvedValue({ user: { role: 'user' } })

    const form = new FormData()
    form.append('title', 'A')
    const response = await POST(new NextRequest(new Request('http://localhost/api/admin/challenges', { method: 'POST', body: form })))

    expect(response.status).toBe(401)
    await expect(response.json()).resolves.toEqual({ error: 'Unauthorized' })
  })

  it('returns 400 when required form fields are missing', async () => {
    authMock.api.getSession.mockResolvedValue({ user: { role: 'admin' } })
    const form = new FormData()
    form.append('title', 'A')

    const response = await POST(new NextRequest(new Request('http://localhost/api/admin/challenges', { method: 'POST', body: form })))

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({ error: 'All fields are required' })
  })

  it('creates a challenge and returns 201 on success', async () => {
    authMock.api.getSession.mockResolvedValue({ user: { role: 'admin' } })
    cloudinaryMock.uploader.upload.mockResolvedValue({ secure_url: 'https://img.test/a.png' })
    prismaMock.challenge.create.mockResolvedValue({ id: 'c1' })

    const form = new FormData()
    form.append('title', 'Road to Fit')
    form.append('description', 'desc')
    form.append('subtitle', 'sub')
    form.append('days', '10')
    form.append('rewardPoints', '50')
    form.append('category', 'Strength')
    form.append('level', 'beginner')
    form.append('goals[]', 'Goal 1')
    form.append('images[]', new File(['abc'], 'a.png', { type: 'image/png' }))

    const response = await POST(new NextRequest(new Request('http://localhost/api/admin/challenges', { method: 'POST', body: form })))

    expect(prismaMock.challenge.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ title: 'Road to Fit', rewardPoints: 50 }) }))
    expect(response.status).toBe(201)
  })

  it('returns paginated challenge list for admin GET', async () => {
    authMock.api.getSession.mockResolvedValue({ user: { role: 'admin' } })
    prismaMock.challenge.count.mockResolvedValue(6)
    prismaMock.challenge.findMany.mockResolvedValue([{ id: 'c1' }])

    const response = await GET(new NextRequest(new Request('http://localhost/api/admin/challenges?page=1')))

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toMatchObject({
      data: [{ id: 'c1' }],
      pagination: { totalItems: 6, currentPage: 1 },
    })
  })
})
