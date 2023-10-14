import { Company } from '@/domain/enterprise/entities/company'
import { UniqueId } from '@/core/entities/value-objects/unique-id'
import { type CompanyRepository } from '../../repositories/company-repository'
import { Either, right } from '@/core/either'

interface CreateCompanyUseCaseRequest {
  name: string,
  managerId: string
}

type CreateCompanyUseCaseResponse = Either<
  null,
  {
    company: Company
  }
>

export class CreateCompanyUseCase {
  constructor (private readonly companyRepository: CompanyRepository) {}

  async execute ({
    name,
    managerId
  }: CreateCompanyUseCaseRequest): Promise<CreateCompanyUseCaseResponse> {
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
