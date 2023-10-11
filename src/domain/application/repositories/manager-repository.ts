import { type Manager } from '../../enterprise/entities/manager'

export interface ManagerRepository {
  create: (manager: Manager) => Promise<void>
  findByEmail: (email: string) => Promise<Manager | null>
  findById: (id: string) => Promise<Manager | null>
}
