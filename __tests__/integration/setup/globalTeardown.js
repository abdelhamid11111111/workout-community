const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const STATE_FILE = path.resolve(__dirname, '.test-db.json')

module.exports = async function globalTeardown() {
  if (!fs.existsSync(STATE_FILE)) return
  const { containerId } = JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'))
  try {
    execSync(`docker stop ${containerId}`, { stdio: 'ignore' })
  } catch (err) {
    // Don't fail the whole test run over a cleanup hiccup — just warn,
    // so CI logs are visible but the job status reflects the actual tests.
    console.warn('Could not stop the test Postgres container automatically:', err)
  } finally {
    fs.unlinkSync(STATE_FILE)
  }
}