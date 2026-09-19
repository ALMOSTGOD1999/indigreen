import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { DateTime } from 'luxon'

import DailyBonusService from '#services/daily_bonus_service'
import env from '#start/env'

export default class CreditDailyBonuses extends BaseCommand {
  static commandName = 'bonuses:credit-daily'
  static description =
    'Credit all daily bonuses: cashback (70/20 split), level income, and salary to dedicated wallets'

  static options: CommandOptions = { startApp: true }

  async run() {
    const today = DateTime.now().setZone(env.get('TZ')).startOf('day')

    this.logger.info(`Processing daily bonuses for ${today.toISODate()}`)

    const results = await DailyBonusService.creditAllDailyBonuses(today)

    this.logger.success(
      `Daily bonuses credited for ${today.toISODate()}:\n` +
        `  Cashback: ${results.cashback.users} users, ₹${results.cashback.amount.toLocaleString('en-IN')}\n` +
        `  Level Income: ${results.levelIncome.users} users, ₹${results.levelIncome.amount.toLocaleString('en-IN')}\n` +
        `  Salary: ${results.salary.users} users, ₹${results.salary.amount.toLocaleString('en-IN')}`
    )
  }
}
