import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

// Deliberately separate from jest.config.ts: unit tests run jsdom + mocks,
// integration tests run node + a real ephemeral Postgres. Mixing them into
// one config risks unit tests accidentally depending on DB state, or
// integration tests being silently skipped in the fast unit-test loop.
const config: Config = {
  displayName: 'integration',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/__tests__/integration/**/*.integration.test.ts'],
  globalSetup: '<rootDir>/__tests__/integration/setup/globalSetup.js',
  globalTeardown: '<rootDir>/__tests__/integration/setup/globalTeardown.js',
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
  testTimeout: 30000, // container start + real DB round trips are slower than mocks
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
}

export default createJestConfig(config)