import { type ManagerRepository } from '@/domain/application/repositories/manager-repository'
import { type Manager } from '@/domain/enterprise/entities/manager'

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

  async findById(id: string) {
    const manager = this.items.find(item => item.id.toString === id)

    if (!manager) {
      return null
    }

    return manager
  }
}
