import { Company } from "@/domain/enterprise/entities/company";
import { CompanyRepository } from "../../repositories/company-repository";
import { ManagerRepository } from "../../repositories/manager-repository";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { Either, left, right } from "@/core/either";

interface FetchCompaniesByManagerUseCaseRequest {
  managerId: string
}

type FetchCompaniesByManagerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    companies: Company[]
  }
>

export class FetchCompaniesByManagerUseCase {

  constructor(
    private managerRepository: ManagerRepository,
    private companyRepository: CompanyRepository
  ) {}

  async execute({ managerId }: FetchCompaniesByManagerUseCaseRequest): Promise<FetchCompaniesByManagerUseCaseResponse> {
    const manager = await this.managerRepository.findById(managerId)

    if (!manager) {
      return left(new ResourceNotFoundError())
    }

    const companies = await this.companyRepository.findManyByManagerId(managerId)

    return right({
      companies
    })
  }

}