import { execSync } from 'node:child_process'

/**
 * Run migrations before starting the server
 * when the MIGRATE environment variable is set.
 * Wrapped in try/catch so migration failures don't crash the server.
 */
if (process.env.MIGRATE === 'true') {
  try {
    console.log('Running migrations...')
    execSync('node ace migration:run --force', { stdio: 'inherit' })
  } catch (error) {
    console.error('Migration failed, starting server anyway:', error.message)
  }
}

/**
 * Start the server
 */
console.log('Starting server...')
await import('./bin/server.js')
