// Plain CommonJS on purpose: globalSetup/globalTeardown run outside the
// Next.js/SWC transform pipeline, so we avoid TS syntax here entirely.
const { PostgreSqlContainer } = require('@testcontainers/postgresql')
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const STATE_FILE = path.resolve(__dirname, '.test-db.json')

module.exports = async function globalSetup() {
  const container = await new PostgreSqlContainer('postgres:16-alpine')
    .withDatabase('workout_community_test')
    .withUsername('test_user')
    .withPassword('test_pass')
    .start()

  const databaseUrl = container.getConnectionUri()

  process.env.DATABASE_URL = databaseUrl
  process.env.BETTER_AUTH_URL = process.env.BETTER_AUTH_URL || 'http://localhost:3000'
  process.env.BETTER_AUTH_SECRET =
    process.env.BETTER_AUTH_SECRET || 'integration-test-secret-do-not-use-in-prod'

  // Run the project's REAL migrations against the ephemeral DB. This is what
  // makes the suite genuinely catch schema-level fault conditions (unique
  // constraints, FK violations, cascades) instead of only what a mock allows.
  execSync('npx prisma migrate deploy', {
    cwd: path.resolve(__dirname, '../../../'),
    env: { ...process.env, DATABASE_URL: databaseUrl },
    stdio: 'inherit',
  })

  // globalSetup and globalTeardown are not guaranteed to share in-memory
  // state reliably across all Jest run modes, so persist what teardown
  // needs to a file instead of relying on a shared JS reference.
  fs.writeFileSync(STATE_FILE, JSON.stringify({ containerId: container.getId() }))
}