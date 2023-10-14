import { describe, it, expect, beforeEach } from "vitest"
import { faker } from "@faker-js/faker"

import { FetchCompaniesByManagerUseCase } from "."
import { UniqueId } from "@/core/entities/value-objects/unique-id"
import { InMemoryCompanyRepository } from "test/repositories/in-memory-company-repository"
import { InMemoryManagerRepository } from "test/repositories/in-memory-manager-repository"
import { makeManager } from "test/factories/make-manager"
import { makeCompany } from "test/factories/make-company"

let companyRepository: InMemoryCompanyRepository
let managerRepository: InMemoryManagerRepository
let sut: FetchCompaniesByManagerUseCase

describe('Fetch Companies By Manager Use Case', () => {

  beforeEach(() => {
    managerRepository = new InMemoryManagerRepository()
    companyRepository = new InMemoryCompanyRepository()
    sut = new FetchCompaniesByManagerUseCase(managerRepository, companyRepository)
  })

  it('should be able to fetch all companies created by a unique manager', async () => {
    const managerId = new UniqueId(faker.string.uuid())
    managerRepository.create(await makeManager({ id: managerId }))

    for(let i = 1; i <= 5 ; i++) {
      companyRepository.create(makeCompany({ managerId }))
    }

    const payload = {
      managerId: managerId.toString,
    }

    const result = await sut.execute(payload)

    expect(result.isRight()).toBe(true)
  })
})
