import { Company } from '../../enterprise/entities/company'

export interface CompanyRepository {
  create: (company: Company) => Promise<void>
  findManyByManagerId: (managerId: string) => Promise<Company[]>
  findById: (id: string) => Promise<Company | null>
}
