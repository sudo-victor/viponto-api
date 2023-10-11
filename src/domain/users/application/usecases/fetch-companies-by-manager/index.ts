import { Company } from "@/domain/users/enterprise/entities/company";
import { CompanyRepository } from "../../repositories/company-repository";
import { ManagerRepository } from "../../repositories/manager-repository";

interface FetchCompaniesByManagerUseCaseRequest {
  managerId: string
}

interface FetchCompaniesByManagerUseCaseResponse {
  companies: Company[]
}

export class FetchCompaniesByManagerUseCase {

  constructor(
    private managerRepository: ManagerRepository,
    private companyRepository: CompanyRepository
  ) {}

  async execute({ managerId }: FetchCompaniesByManagerUseCaseRequest): Promise<FetchCompaniesByManagerUseCaseResponse> {
    const manager = await this.managerRepository.findById(managerId)

    if (!manager) {
      throw new Error('Manager not found')
    }

    const companies = await this.companyRepository.findManyByManagerId(managerId)

    return {
      companies
    }
  }

}