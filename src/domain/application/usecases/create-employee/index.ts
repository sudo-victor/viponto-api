import { Employee } from '@/domain/enterprise/entities/employee'
import { EmployeeRepository } from '../../repositories/employee-repository'
import { hash } from 'bcryptjs'
import { UniqueId } from '@/core/entities/value-objects/unique-id'
import { Code } from '@/domain/enterprise/entities/value-objects/Code'
import { CompanyRepository } from '../../repositories/company-repository'

interface CreateEmployeeUseCaseRequest {
  name: string,
  password: string,
  companyId: string
  managerId: string
}

interface CreateEmployeeUseCaseResponse {
  employee: Employee
}

export class CreateEmployeeUseCase {
  constructor (
    private readonly employeeRepository: EmployeeRepository,
    private readonly companyRepository: CompanyRepository
  ) {}

  async execute ({
    name,
    password,
    companyId,
    managerId,
  }: CreateEmployeeUseCaseRequest): Promise<CreateEmployeeUseCaseResponse> {
    const company = await this.companyRepository.findById(companyId)

    if (!company) {
      throw new Error('Company not found')
    }

    if (company.managerId.toString !== managerId) {
      throw new Error('Not allowed')
    }

    const employee = Employee.create({
      name,
      code: new Code(name),
      company_id: new UniqueId(companyId),
      password_hash: await hash(password, 8)
    })

    await this.employeeRepository.create(employee)

    return {
      employee
    }
  }
}
