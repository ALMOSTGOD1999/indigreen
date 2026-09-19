/**
 * Scheduler DISABLED to fix production 502 crash.
 *
 * The adonisjs-scheduler Worker boots an FsLoader that imports every
 * command file at startup. The "Invalid URL" RuntimeException from
 * FsLoader prevents the server from starting.
 *
 * TODO: Re-enable after upgrading adonisjs-scheduler or moving
 * scheduled commands out of the commands/ directory.
 */

// import { Worker } from 'adonisjs-scheduler'
// import app from '@adonisjs/core/services/app'
//
// const worker = new Worker(app)
// const schedule = await app.container.make('scheduler')
//
// schedule.command('calculate:salaries').timezone(process.env.TZ || 'Asia/Kolkata').lastDayOfMonth('23:59')
// schedule.command('bonuses:credit-daily').timezone(process.env.TZ || 'Asia/Kolkata').dailyAt('00:10')
// schedule.command('investments:distribute-returns').timezone(process.env.TZ || 'Asia/Kolkata').monthlyOn(1, '00:05')
//
// app.terminating(async () => { await worker.stop() })
// await worker.start()
