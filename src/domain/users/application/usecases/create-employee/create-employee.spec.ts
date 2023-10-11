import { describe, it, expect, beforeEach } from "vitest"
import { faker } from "@faker-js/faker"

import { CreateEmployeeUseCase } from "."
import { InMemoryEmployeeRepository } from "test/repositories/in-memory-employee-repository"
import { UniqueId } from "@/core/entities/value-objects/unique-id"
import { InMemoryCompanyRepository } from "test/repositories/in-memory-company-repository"
import { makeManager } from "test/factories/make-manager"
import { makeCompany } from "test/factories/make-company"

let employeeRepository: InMemoryEmployeeRepository
let companyRepository: InMemoryCompanyRepository
let sut: CreateEmployeeUseCase

describe('Create Employee Use Case', () => {

  beforeEach(() => {
    employeeRepository = new InMemoryEmployeeRepository()
    companyRepository = new InMemoryCompanyRepository()
    sut = new CreateEmployeeUseCase(employeeRepository, companyRepository)
  })

  it('should be able to create a employee', async () => {
    const manager = await makeManager({})
    const company = makeCompany({ managerId: manager.id })

    companyRepository.create(company)

    const payload = {
      name: faker.person.fullName(),
      companyId: company.id.toString,
      managerId: manager.id.toString,
      password: faker.internet.password(),
    }

    await sut.execute(payload)

    expect(employeeRepository.items[0].id).toEqual(expect.any(UniqueId))
  })

  it('should not be able to create a employee if company not found', async () => {
    const payload = {
      name: faker.person.fullName(),
      companyId: faker.string.uuid(),
      managerId: faker.string.uuid(),
      password: faker.internet.password(),
    }

    await expect(() => sut.execute(payload)).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to create a employee if manager is not an admin of the current company', async () => {
    const company = makeCompany({ managerId: new UniqueId(faker.string.uuid()) })

    companyRepository.create(company)

    const payload = {
      name: faker.person.fullName(),
      companyId: company.id.toString,
      managerId: faker.string.uuid(),
      password: faker.internet.password(),
    }

    await expect(() => sut.execute(payload)).rejects.toBeInstanceOf(Error)
  })
})
