import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    const db = this.db

    // Add maxMonths column
    await db.rawQuery(`
      ALTER TABLE investment_packages ADD COLUMN max_months integer
    `)

    // Migrate existing slabs to new 4-tier structure
    await db.rawQuery(`DELETE FROM investment_packages`)

    await db.table('investment_packages').insert([
      {
        name: 'Silver Plan',
        min_amount: 10000,
        max_amount: 99999,
        monthly_return_percent: 2,
        max_return_percent: 100,
        max_months: 50,
        sort_order: 1,
        is_active: true,
      },
      {
        name: 'Gold Plan',
        min_amount: 100000,
        max_amount: 499999,
        monthly_return_percent: 2.5,
        max_return_percent: 100,
        max_months: 40,
        sort_order: 2,
        is_active: true,
      },
      {
        name: 'Platinum Plan',
        min_amount: 500000,
        max_amount: 999999,
        monthly_return_percent: 3,
        max_return_percent: 100,
        max_months: 33,
        sort_order: 3,
        is_active: true,
      },
      {
        name: 'Diamond Plan',
        min_amount: 1000000,
        max_amount: null,
        monthly_return_percent: 4,
        max_return_percent: 100,
        max_months: 25,
        sort_order: 4,
        is_active: true,
      },
    ])

    // Fix active investments: update monthly_return_rate to match new slabs
    const slabs = await db
      .from('investment_packages')
      .where('is_active', true)
      .orderBy('min_amount', 'desc')

    if (slabs.length > 0) {
      const investments = await db.from('investments').where('status', 'active')
      for (const investment of investments) {
        const amount = Number(investment.amount)
        for (const slab of slabs) {
          const minAmt = Number(slab.min_amount)
          const maxAmt = slab.max_amount === null ? null : Number(slab.max_amount)
          if (amount >= minAmt && (maxAmt === null || amount <= maxAmt)) {
            await db
              .rawQuery(`UPDATE investments SET monthly_return_rate = ? WHERE id = ?`, [
                slab.monthly_return_percent,
                investment.id,
              ])
            break
          }
        }
      }
    }
  }

  async down() {
    // No reversal — data migration
  }
}
