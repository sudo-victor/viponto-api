import { Employee } from '@/domain/enterprise/entities/employee'
import { EmployeeRepository } from '../../repositories/employee-repository'
import { hash } from 'bcryptjs'
import { UniqueId } from '@/core/entities/value-objects/unique-id'
import { Code } from '@/domain/enterprise/entities/value-objects/Code'
import { CompanyRepository } from '../../repositories/company-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { Hasher } from '../../criptography/hasher'

interface CreateEmployeeUseCaseRequest {
  name: string,
  password: string,
  companyId: string
  managerId: string
}

type CreateEmployeeUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    employee: Employee
  }
>

export class CreateEmployeeUseCase {
  constructor (
    private readonly employeeRepository: EmployeeRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly hasher: Hasher,
  ) {}

  async execute ({
    name,
    password,
    companyId,
    managerId,
  }: CreateEmployeeUseCaseRequest): Promise<CreateEmployeeUseCaseResponse> {
    const company = await this.companyRepository.findById(companyId)

    if (!company) {
      return left(new ResourceNotFoundError())
    }

    if (company.managerId.toString !== managerId) {
      return left(new NotAllowedError())
    }
    
    const hashedPassword = await this.hasher.hash(password)

    const employee = Employee.create({
      name,
      code: new Code(name),
      company_id: new UniqueId(companyId),
      password_hash: hashedPassword
    })

    await this.employeeRepository.create(employee)

    return right({
      employee
    })
  }
}
