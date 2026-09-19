import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { DateTime } from 'luxon'

import InvestmentService from '#services/investment_service'
import env from '#start/env'

export default class DistributeInvestmentReturns extends BaseCommand {
  static commandName = 'investments:distribute-returns'
  static description =
    'Distribute monthly investment returns: 70% cashback wallet and 30% gold wallet'

  static options: CommandOptions = { startApp: true }

  async run() {
    const period = DateTime.now().setZone(env.get('TZ')).startOf('month')
    const result = await InvestmentService.distributeMonthlyReturns(period)

    this.logger.success(
      `Investment returns distributed for ${result.periodMonth}. Processed: ${result.processed}, skipped: ${result.skipped}`
    )
  }
}
