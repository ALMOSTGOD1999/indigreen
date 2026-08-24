import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import User from '#models/user'

export default class CreateMdIsmile extends BaseCommand {
  static commandName = 'create:md-ismile'
  static description = 'Create MD Ismile as parent of IG190183 (root user with random ID)'
  static options: CommandOptions = { startApp: true }

  async run() {
    const admin = await User.find(190183)
    if (!admin) {
      this.logger.error('IG190183 not found')
      return
    }

    // Check if MD Ismile already exists
    const existing = await User.query().where('name', 'MD Ismile').first()
    if (existing) {
      this.logger.warning(`MD Ismile already exists: IG${String(existing.id).padStart(6, '0')}`)
      this.logger.info(`Updating IG190183 parent to IG${String(existing.id).padStart(6, '0')}...`)
      admin.parentId = existing.id
      await admin.save()
      this.logger.success(`Done! IG190183 now under IG${String(existing.id).padStart(6, '0')}`)
      return
    }

    this.logger.info('Creating MD Ismile as root user...')

    // Create MD Ismile as root user (no parent) — random ID auto-generated
    const mdIsmile = await User.create({
      name: 'MD Ismile',
      email: 'mdismile@primejewellery.com',
      phone: '0000000000',
      password: 'Indigreen@123',
      parentId: null,
      role: 'user' as any,
      gender: 'male' as any,
    })

    // Now set IG190183's parent to MD Ismile
    admin.parentId = mdIsmile.id
    await admin.save()

    this.logger.success(
      `Created root user: IG${String(mdIsmile.id).padStart(6, '0')} — ${mdIsmile.name}`
    )
    this.logger.success(
      `Updated IG190183 (Admin) — parent is now IG${String(mdIsmile.id).padStart(6, '0')} (${mdIsmile.name})`
    )
    this.logger.info(`Default password for MD Ismile: Indigreen@123`)
  }
}
