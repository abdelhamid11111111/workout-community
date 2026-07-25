import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@/generated/prisma/client'

let client: PrismaClient | null = null

// Singleton per test worker process — avoids exhausting Postgres connections
// when many test files run in the same integration suite.
export function getTestPrismaClient(): PrismaClient {
  if (!client) {
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
    client = new PrismaClient({ adapter })
  }
  return client
}

export async function resetDatabase(): Promise<void> {
  const prisma = getTestPrismaClient()
  // Children-first order to respect FK constraints between tests sharing
  // one ephemeral database (faster than tearing down/rebuilding per test).
  await prisma.workout.deleteMany()
  await prisma.userChallenge.deleteMany()
  await prisma.challenge.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.verification.deleteMany()
  await prisma.user.deleteMany()
}

export async function disconnectTestPrisma(): Promise<void> {
  if (client) {
    await client.$disconnect()
    client = null
  }
}