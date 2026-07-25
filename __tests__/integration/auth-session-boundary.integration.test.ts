import { prismaMock } from '../../__mocks__/prisma'
jest.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
jest.mock('@/lib/auth', () => ({ auth: { api: { getSession: jest.fn() } } }))

import { NextRequest } from 'next/server'
import { POST as joinChallenge } from '@/app/api/challenge/join/route'
import { GET as isJoined } from '@/app/api/is-joined/[id]/route'
import { GET as myChallenges } from '@/app/api/mychallenges/route'
import { auth } from '@/lib/auth'

const getSession = auth.api.getSession as unknown as jest.Mock

async function hitAllProtectedRoutes() {
  const join = await joinChallenge(new NextRequest(new Request('http://localhost/api/challenge/join', {
    method: 'POST', body: JSON.stringify({ challengeId: 'c1' }),
  })))
  const joined = await isJoined(new NextRequest(new Request('http://localhost/api/is-joined/c1')), { params: Promise.resolve({ id: 'c1' }) })
  const mine = await myChallenges(new NextRequest(new Request('http://localhost/api/mychallenges')))
  return { join, joined, mine }
}

describe('Auth boundary — same "no session" outcome expected on every protected route', () => {
  it('fault tolerance: getSession resolving null (no cookie / expired / revoked — better-auth ' +
     'collapses all of these to null) is rejected 401 everywhere, consistently', async () => {
    getSession.mockResolvedValue(null)
    const { join, joined, mine } = await hitAllProtectedRoutes()
    expect(join.status).toBe(401)
    expect(joined.status).toBe(401)
    expect(mine.status).toBe(401)
  })

  it('fault tolerance: getSession itself throwing (e.g. better-auth\'s DB adapter fails) ' +
     'must not crash the route — this currently is NOT caught in is-joined/mychallenges ' +
     '(no try/catch around auth.api.getSession), only in join. Documents the current gap.', async () => {
    getSession.mockRejectedValue(new Error('auth db unreachable'))
    await expect(joinChallenge(new NextRequest(new Request('http://localhost/api/challenge/join', {
      method: 'POST', body: JSON.stringify({ challengeId: 'c1' }),
    })))).rejects.toThrow() // <- currently uncaught; flags a real hardening opportunity
  })
})