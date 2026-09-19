import { Worker } from 'adonisjs-scheduler'
import app from '@adonisjs/core/services/app'

const worker = new Worker(app)

/**
 * Register schedules programmatically (avoids @schedule decorator
 * which crashes at module-load time with "Invalid URL" in production).
 */
const schedule = await app.container.make('scheduler')

// Performance incentive calculation — last day of every month at 23:59 IST
schedule
  .command('calculate:salaries')
  .timezone(process.env.TZ || 'Asia/Kolkata')
  .lastDayOfMonth('23:59')

// Daily bonus crediting — every day at 00:10 IST
schedule
  .command('bonuses:credit-daily')
  .timezone(process.env.TZ || 'Asia/Kolkata')
  .dailyAt('00:10')

// Monthly investment return distribution — 1st of every month at 00:05 IST
schedule
  .command('investments:distribute-returns')
  .timezone(process.env.TZ || 'Asia/Kolkata')
  .monthlyOn(1, '00:05')

app.terminating(async () => {
  await worker.stop()
})

await worker.start()
