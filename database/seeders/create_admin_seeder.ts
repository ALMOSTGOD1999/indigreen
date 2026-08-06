import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import { UserRoleEnum } from '#enums/user'

export default class CreateAdminSeeder extends BaseSeeder {
  async run() {
    // Check if admin already exists
    const existingAdmin = await User.query().where('role', UserRoleEnum.ADMIN).first()
    if (existingAdmin) {
      console.log(`Admin already exists: ID ${existingAdmin.id}, Name: ${existingAdmin.name}`)
      // Update password anyway
      existingAdmin.password = 'Indi@6969'
      await existingAdmin.save()
      console.log('✅ Admin password updated to Indi@6969')
      return
    }

    // Create a new admin user
    await User.create({
      id: 1,
      name: 'Admin',
      email: 'admin@indigreenjewellery.com',
      phone: '0000000000',
      password: 'Indi@6969',
      role: UserRoleEnum.ADMIN,
      gender: 'male' as any,
    })
    console.log(`✅ Admin user created with ID 1 and password Indi@6969`)
  }
}
