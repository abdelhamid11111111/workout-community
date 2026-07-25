import { prismaMock } from '../../__mocks__/prisma'
jest.mock('@/lib/prisma', () => ({ prisma: prismaMock }))

import { NextRequest } from 'next/server'
import { GET as listChallenges } from '@/app/api/challenge/route'
import { buildChallenge } from './setup/factories'

const makeRequest = (query: string) => new NextRequest(new Request(`http://localhost/api/challenge${query}`))

describe('GET /api/challenge', () => {
  it('happy path: returns data + pagination metadata from Prisma', async () => {
    prismaMock.challenge.count.mockResolvedValue(8)
    prismaMock.challenge.findMany.mockResolvedValue([buildChallenge(), buildChallenge()] as never)

    const res = await listChallenges(makeRequest('?page=1'))
    const body = await res.json()
    expect(res.status).toBe(200)
    expect(body.pagination).toMatchObject({ currentPage: 1, totalItems: 8, hasNextPage: true })
  })

  it('edge case: page=0 is rejected 400 before Prisma is ever called', async () => {
    const res = await listChallenges(makeRequest('?page=0'))
    expect(res.status).toBe(400)
    expect(prismaMock.challenge.findMany).not.toHaveBeenCalled()
  })

  it('edge case: negative page is rejected 400', async () => {
    const res = await listChallenges(makeRequest('?page=-3'))
    expect(res.status).toBe(400)
  })

  it('fault tolerance: Prisma throwing (e.g. DB unreachable, or an invalid enum cast) ' +
     'must degrade to a handled 500, not an unhandled rejection', async () => {
    prismaMock.challenge.count.mockRejectedValue(new Error('connection terminated'))
    const res = await listChallenges(makeRequest(''))
    expect(res.status).toBe(500)
    expect((await res.json()).error).toBe('server error')
  })

  it('fault tolerance: empty result set from Prisma still returns a well-formed 200 payload', async () => {
    prismaMock.challenge.count.mockResolvedValue(0)
    prismaMock.challenge.findMany.mockResolvedValue([])
    const res = await listChallenges(makeRequest(''))
    const body = await res.json()
    expect(body.data).toEqual([])
    expect(body.pagination.totalItems).toBe(0)
  })

  // NOTE: without a real DB we can no longer prove Postgres actually rejects an
  // invalid category/level enum value — we can only prove the route handles it
  // IF Prisma throws. This test simulates that; it no longer verifies Postgres's
  // real behavior the way the testcontainers version did.
  it('fault tolerance: simulated invalid-enum Prisma error still returns 500, not a crash', async () => {
    prismaMock.challenge.count.mockRejectedValue({ code: 'P2009', message: 'invalid enum value' })
    const res = await listChallenges(makeRequest('?category=NotReal'))
    expect(res.status).toBe(500)
  })
})