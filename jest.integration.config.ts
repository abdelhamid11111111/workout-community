import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  displayName: 'integration',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/__tests__/integration/**/*.integration.test.ts'],
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
  clearMocks: true, // resets jest.fn() call history between tests automatically — no manual mockReset needed per file
}

export default createJestConfig(config)