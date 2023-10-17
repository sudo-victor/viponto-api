import { Company } from '@/domain/enterprise/entities/company'
import { UniqueId } from '@/core/entities/value-objects/unique-id'
import { type CompanyRepository } from '../../repositories/company-repository'
import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ManagerRepository } from '../../repositories/manager-repository'

interface CreateCompanyUseCaseRequest {
  name: string,
  managerId: string
}

type CreateCompanyUseCaseResponse = Either<
  NotAllowedError,
  {
    company: Company
  }
>

export class CreateCompanyUseCase {
  constructor (
    private readonly companyRepository: CompanyRepository,
    private readonly managerRepository: ManagerRepository
  ) {}

  async execute ({
    name,
    managerId
  }: CreateCompanyUseCaseRequest): Promise<CreateCompanyUseCaseResponse> {
    const manager = await this.managerRepository.findById(managerId)

    if (!manager) {
      return left(new NotAllowedError())
    }

    const company = Company.create({
      name,
      manager_id: new UniqueId(managerId)
    })

    await this.companyRepository.create(company)

    return right({
      company
    })
  }
}
