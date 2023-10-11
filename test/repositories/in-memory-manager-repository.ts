import { type ManagerRepository } from '@/domain/users/application/repositories/manager-repository'
import { type Manager } from '@/domain/users/enterprise/entities/manager'

export class InMemoryManagerRepository implements ManagerRepository {
  items: Manager[] = []

  async create (manager: Manager) {
    this.items.push(manager)
  }

  async findByEmail (email: string) {
    const manager = this.items.find(item => item.email === email)

    if (!manager) {
      return null
    }

    return manager
  }
}
