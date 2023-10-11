import { type EmployeeRepository } from '@/domain/application/repositories/employee-repository'
import { type Employee } from '@/domain/users/enterprise/entities/employee'

export class InMemoryEmployeeRepository implements EmployeeRepository {
  items: Employee[] = []

  async create (employee: Employee) {
    this.items.push(employee)
  }

  async findById(id: string) {
    const employee = this.items.find(item => item.id.toString === id)

    if (!employee) {
      return null
    }

    return employee
  }
}
