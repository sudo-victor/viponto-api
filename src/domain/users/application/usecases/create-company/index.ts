import { Company } from '@/domain/users/enterprise/entities/company'
import { UniqueId } from '@/core/entities/value-objects/unique-id'
import { type CompanyRepository } from '../../repositories/company-repository'

interface CreateCompanyUseCaseRequest {
  name: string,
  managerId: string
}

interface CreateCompanyUseCaseResponse {
  company: Company
}

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

    return {
      company
    }
  }
}
