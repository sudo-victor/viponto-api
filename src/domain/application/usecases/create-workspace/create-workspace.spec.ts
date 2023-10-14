import { describe, it, expect, beforeEach } from "vitest"
import { faker } from "@faker-js/faker"

import { CreateWorkspaceUseCase } from "."
import { InMemoryWorkspaceRepository } from "test/repositories/in-memory-workspace-repository"
import { UniqueId } from "@/core/entities/value-objects/unique-id"
import { InMemoryCompanyRepository } from "test/repositories/in-memory-company-repository"
import { makeCompany } from "test/factories/make-company"
import { randomUUID } from "crypto"
import { NotAllowedError } from "@/core/errors/not-allowed-error"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

let workspaceRepository: InMemoryWorkspaceRepository
let companyRepository: InMemoryCompanyRepository
let sut: CreateWorkspaceUseCase

describe('Create Workspace Use Case', () => {

  beforeEach(() => {
    workspaceRepository = new InMemoryWorkspaceRepository()
    companyRepository = new InMemoryCompanyRepository()
    sut = new CreateWorkspaceUseCase(workspaceRepository, companyRepository)
  })

  it('should be able to create a workspace', async () => {
    const managerId = new UniqueId(randomUUID())
    const company = makeCompany({ managerId })

    await companyRepository.create(company)

    const payload = {
      name: faker.person.fullName(),
      description: faker.lorem.text(),
      companyId: company.id.toString,
      userId: managerId.toString
    }

    await sut.execute(payload)

    expect(workspaceRepository.items[0].id).toEqual(expect.any(UniqueId))
  })

  it('should not be able to create a workspace if company was not found', async () => {
    const payload = {
      name: faker.person.fullName(),
      description: faker.lorem.text(),
      companyId: randomUUID(),
      userId: randomUUID()
    }

    const result = await sut.execute(payload)

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to create a workspace if an userId diff of managerId from company', async () => {
    const managerId = new UniqueId(randomUUID())
    const company = makeCompany({ managerId })

    await companyRepository.create(company)

    const payload = {
      name: faker.person.fullName(),
      description: faker.lorem.text(),
      companyId: company.id.toString,
      userId: randomUUID()
    }

    const result = await sut.execute(payload)

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
