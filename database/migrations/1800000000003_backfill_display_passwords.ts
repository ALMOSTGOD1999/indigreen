import { BaseSchema } from '@adonisjs/lucid/schema'
import hash from '@adonisjs/core/services/hash'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    const hashedPassword = await hash.make('123456')

    await this.db
      .from(this.tableName)
      .update({
        display_password: '123456',
        password: hashedPassword,
      })
  }

  async down() {
    // Irreversible
  }
}
