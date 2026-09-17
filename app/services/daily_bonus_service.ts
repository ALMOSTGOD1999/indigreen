import { DateTime } from 'luxon'
import logger from '@adonisjs/core/services/logger'
import db from '@adonisjs/lucid/services/db'

import User from '#models/user'
import Purchase from '#models/purchase'
import LevelIncome from '#models/level_income'
import TeamBusinessLevel from '#models/team_business_level'
import Investment from '#models/investment'
import InvestmentPackage from '#models/investment_package'
import WalletService from '#services/wallet_service'
import RewardService from '#services/reward_service'
import { SALARY_CONFIG } from '#enums/salary'

const INCOME_WALLET_PERCENT = 70
const REPURCHASE_WALLET_PERCENT = 20

function roundMoney(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100
}

export default class DailyBonusService {
  /**
   * Master method — credits ALL bonuses for a single day.
   * Called once daily by the CreditDailyBonuses command.
   */
  static async creditAllDailyBonuses(date: DateTime) {
    const day = date.startOf('day')
    const dayStr = day.toISODate()!

    logger.info(`[daily-bonus] Starting daily bonus crediting for ${dayStr}`)

    const results = {
      cashback: { users: 0, amount: 0 },
      levelIncome: { users: 0, amount: 0 },
      salary: { users: 0, amount: 0 },
    }

    // 1. Cashback (investment return) — credit 70% to income wallet, 20% to repurchase wallet
    const cashback = await this.creditCashbackForDay(day)
    results.cashback = cashback

    // 2. Level Income — credit to working wallet
    const levelIncome = await this.creditLevelIncomeForDay(day)
    results.levelIncome = levelIncome

    // 3. Salary / Performance Incentive — credit to working wallet
    const salary = await this.creditSalaryForDay(day)
    results.salary = salary

    logger.info(
      `[daily-bonus] Completed for ${dayStr}: ` +
        `cashback=${cashback.users} users (₹${cashback.amount}), ` +
        `level=${levelIncome.users} users (₹${levelIncome.amount}), ` +
        `salary=${salary.users} users (₹${salary.amount})`
    )

    return results
  }

  // ─── 1. Cashback (Investment Return) ──────────────────────────

  /**
   * For each active investment, compute today's prorated return and credit
   * 70% to income wallet + 20% to repurchase wallet.
   */
  static async creditCashbackForDay(day: DateTime) {
    const dayStr = day.toISODate()!
    const investments = await Investment.query().where('status', 'active')

    let usersCredited = 0
    let totalCredited = 0

    for (const investment of investments) {
      try {
        // Skip if already credited today
        const alreadyCredited = await db
          .from('transactions')
          .where('user_id', investment.userId)
          .where('remark', 'ilike', `%cashback wallet%${dayStr}%`)
          .first()
        if (alreadyCredited) continue

        // Check if investment is active on this day
        const startedAt = DateTime.fromJSDate(new Date(investment.startedAt.toString()))
        if (day < startedAt.startOf('day')) continue

        // Check max months
        const pkg = await InvestmentPackage.findPackageForAmount(Number(investment.amount))
        if (pkg?.maxMonths) {
          const monthsElapsed = day.diff(startedAt, 'months').months
          if (monthsElapsed >= pkg.maxMonths) continue
        }

        const rate = Number(investment.monthlyReturnRate) || 2
        const investmentAmount = Number(investment.amount)

        // Prorate: 1 day's share of monthly return
        const daysInMonth = day.daysInMonth!
        const returnAmount = roundMoney((investmentAmount * rate) / 100 / daysInMonth)
        const incomeAmount = roundMoney((returnAmount * INCOME_WALLET_PERCENT) / 100)
        const repurchaseAmount = roundMoney((returnAmount * REPURCHASE_WALLET_PERCENT) / 100)

        if (incomeAmount <= 0 && repurchaseAmount <= 0) continue

        // Credit both wallets
        if (incomeAmount > 0) {
          await WalletService.creditWorkingWallet(
            investment.userId,
            incomeAmount,
            0,
            `Cashback wallet (70%) daily investment return for ${dayStr}`
          )
        }
        if (repurchaseAmount > 0) {
          await WalletService.creditRepurchaseWallet(
            investment.userId,
            repurchaseAmount,
            0,
            `Repurchase wallet (20%) daily investment return for ${dayStr}`
          )
        }

        usersCredited++
        totalCredited += incomeAmount + repurchaseAmount
      } catch (error) {
        logger.error(
          `[daily-bonus] Cashback failed for investment ${investment.id} (user ${investment.userId}): ${error instanceof Error ? error.message : error}`
        )
      }
    }

    return { users: usersCredited, amount: roundMoney(totalCredited) }
  }

  // ─── 2. Level Income ──────────────────────────────────────────

  /**
   * For each eligible user, compute today's level income and credit to working wallet.
   * Formula: cumulative descendant purchase amount × level percentage × 12 / 365
   */
  static async creditLevelIncomeForDay(day: DateTime) {
    const dayStr = day.toISODate()!
    const activeUsers = await User.query()
      .where('role', 'user')
      .whereNotNull('activated_at')
      .where('status', 'active')

    let usersCredited = 0
    let totalCredited = 0

    for (const user of activeUsers) {
      try {
        // Skip if already credited today
        const alreadyCredited = await db
          .from('transactions')
          .where('user_id', user.id)
          .where('remark', 'ilike', `%level income%${dayStr}%`)
          .first()
        if (alreadyCredited) continue

        // Determine max depth from directs + team business level
        const directCountRes = await user.related('children').query().count('* as total')
        const directCount = Number(directCountRes[0].$extras.total)

        const tbd = await db.rawQuery(
          `WITH RECURSIVE descendants AS (
             SELECT id FROM users WHERE parent_id = ?
             UNION ALL
             SELECT u.id FROM users u INNER JOIN descendants d ON u.parent_id = d.id
           )
           SELECT COALESCE(SUM(p.amount), 0)::float as total_team_business
           FROM descendants d
           LEFT JOIN purchases p ON p.user_id = d.id AND p.approved_at IS NOT NULL AND p.cancelled_at IS NULL`,
          [user.id]
        )
        const teamBusiness = Number(tbd.rows[0]?.total_team_business) || 0
        const teamBusinessLevel = await TeamBusinessLevel.getLevelForBusiness(teamBusiness)
        const maxDepth = await LevelIncome.getMaxUnlockedLevel(directCount, teamBusinessLevel)

        if (maxDepth === 0) continue

        // Get descendants
        const descendants = await db.rawQuery(
          `
          WITH RECURSIVE descendants AS (
            SELECT id, parent_id, 1 as depth
            FROM users WHERE parent_id = ?
            UNION ALL
            SELECT u.id, u.parent_id, d.depth + 1
            FROM users u INNER JOIN descendants d ON u.parent_id = d.id
            WHERE d.depth < 24
          )
          SELECT * FROM descendants WHERE depth <= ?`,
          [user.id, maxDepth]
        )

        if (descendants.rows.length === 0) continue

        const descendantIds = descendants.rows.map((r: any) => r.id)
        const descendantDepths = new Map<number, number>(
          descendants.rows.map((r: any) => [r.id, r.depth])
        )

        const purchases = await Purchase.query()
          .whereIn('userId', descendantIds)
          .whereNotNull('approvedAt')
          .orderBy('approvedAt', 'asc')

        if (purchases.length === 0) continue

        const purchasesByUser = new Map<number, Purchase[]>()
        for (const p of purchases) {
          if (!purchasesByUser.has(p.userId)) purchasesByUser.set(p.userId, [])
          purchasesByUser.get(p.userId)!.push(p)
        }

        let dayTotal = 0

        for (const [userId, userPurchases] of purchasesByUser.entries()) {
          const depth = descendantDepths.get(userId)!
          const percentage = await LevelIncome.getPercentageForLevel(depth)
          if (percentage === 0) continue

          const validPurchases = userPurchases.filter((p) => !p.cancelledAt)
          if (validPurchases.length === 0) continue

          // Calculate cumulative amount on this day
          const cumulativeAmount = validPurchases
            .filter((p) => {
              const approvedAt = DateTime.fromJSDate(new Date(p.approvedAt!.toString())).endOf('day')
              if (day.endOf('day') < approvedAt) return false
              const expiry = approvedAt.plus({ months: 10 })
              if (day.endOf('day') > expiry) return false
              if (p.stoppedAt) {
                const stoppedAt = DateTime.fromJSDate(new Date(p.stoppedAt!.toString())).endOf('day')
                if (day.endOf('day') > stoppedAt) return false
              }
              return true
            })
            .reduce((sum, p) => sum + Number(p.amount), 0)

          if (cumulativeAmount === 0) continue

          // Daily level reward = cumulative × percentage × 12 / 365
          const dailyReward = (cumulativeAmount * percentage * 12) / 365
          dayTotal += dailyReward
        }

        if (dayTotal <= 0) continue

        const roundedAmount = roundMoney(dayTotal)
        await WalletService.creditWorkingWallet(
          user.id,
          roundedAmount,
          0,
          `Level income daily credit for ${dayStr}`
        )

        usersCredited++
        totalCredited += roundedAmount
      } catch (error) {
        logger.error(
          `[daily-bonus] Level income failed for user ${user.id}: ${error instanceof Error ? error.message : error}`
        )
      }
    }

    return { users: usersCredited, amount: roundMoney(totalCredited) }
  }

  // ─── 3. Salary / Performance Incentive ────────────────────────

  /**
   * Credit salary (performance incentive) daily to working wallet.
   * Monthly salary is split into daily credits (÷30).
   */
  static async creditSalaryForDay(day: DateTime) {
    const dayStr = day.toISODate()!
    const activeUsers = await User.query()
      .where('role', 'user')
      .whereNotNull('activated_at')
      .where('status', 'active')

    let usersCredited = 0
    let totalCredited = 0

    for (const user of activeUsers) {
      try {
        // Skip if already credited today
        const alreadyCredited = await db
          .from('transactions')
          .where('user_id', user.id)
          .where('remark', 'ilike', `%salary daily%${dayStr}%`)
          .first()
        if (alreadyCredited) continue

        // Get current salary designation
        const { legAmounts } = await RewardService.getPowerAndWeaker(user)
        const salaryInfo = RewardService.getSalaryInfo(legAmounts || [])
        if (!salaryInfo) continue

        // Check if user already has a salary record for this month
        const monthStart = day.startOf('month')
        const monthEnd = day.endOf('month')
        const existingSalary = await user.related('salaries').query()
          .whereBetween('created_at', [monthStart.toSQL()!, monthEnd.toSQL()!])
          .first()

        if (!existingSalary) {
          // Create salary record for the month
          const qualifyingBusiness = legAmounts?.reduce((a, b) => a + b, 0) || 0
          await user.related('salaries').create({
            power: legAmounts?.[0] || 0,
            weaker: legAmounts?.slice(1).reduce((a, b) => a + b, 0) || 0,
            status: 'paid',
            qualifyingBusiness,
            paidAt: day,
            info: salaryInfo,
          })
        }

        // Credit daily portion (monthly incentive ÷ 30)
        const salaryConfig = SALARY_CONFIG[salaryInfo.designation as keyof typeof SALARY_CONFIG]
        if (!salaryConfig) continue

        const dailyAmount = roundMoney(salaryConfig.monthlyIncentive / 30)
        if (dailyAmount <= 0) continue

        // Also credit daily portions of house fund, travel allowance, car fund
        const dailyHouseFund = salaryConfig.houseFund ? roundMoney(salaryConfig.houseFund / 30) : 0
        const dailyTravel = roundMoney(salaryConfig.travelAllowance / 30)
        const dailyCarFund = salaryConfig.carFund ? roundMoney(salaryConfig.carFund / 30) : 0
        const totalDaily = dailyAmount + dailyHouseFund + dailyTravel + dailyCarFund

        await WalletService.creditWorkingWallet(
          user.id,
          totalDaily,
          0,
          `Salary daily credit (${salaryInfo.designation}) for ${dayStr}: incentive ₹${dailyAmount} + travel ₹${dailyTravel}${dailyHouseFund > 0 ? ` + house ₹${dailyHouseFund}` : ''}${dailyCarFund > 0 ? ` + car ₹${dailyCarFund}` : ''}`
        )

        usersCredited++
        totalCredited += totalDaily
      } catch (error) {
        logger.error(
          `[daily-bonus] Salary failed for user ${user.id}: ${error instanceof Error ? error.message : error}`
        )
      }
    }

    return { users: usersCredited, amount: roundMoney(totalCredited) }
  }
}
