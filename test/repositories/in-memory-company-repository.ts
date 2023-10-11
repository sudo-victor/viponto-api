import { CompanyRepository } from "@/domain/application/repositories/company-repository"
import { Company } from "@/domain/enterprise/entities/company";

export class InMemoryCompanyRepository implements CompanyRepository {
  items: Company[] = []

  async create(company: Company) {
    this.items.push(company)
  }

  async findManyByManagerId (managerId: string) {
    const companies = this.items
      .filter(item => item.managerId.toString === managerId)

    return companies
  }

  async findById(id: string) {
    const manager = this.items.find(item => item.id.toString === id)

    if (!manager) {
      return null
    }

    return manager
  }
}