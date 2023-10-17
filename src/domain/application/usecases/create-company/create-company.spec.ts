import { describe, it, expect, beforeEach } from "vitest"
import { faker } from "@faker-js/faker"

import { CreateCompanyUseCase } from "."
import { UniqueId } from "@/core/entities/value-objects/unique-id"
import { InMemoryCompanyRepository } from "test/repositories/in-memory-company-repository"
import { InMemoryManagerRepository } from "test/repositories/in-memory-manager-repository"
import { Manager } from "@/domain/enterprise/entities/manager"
import { hash } from "bcryptjs"
import { randomUUID } from "crypto"
import { NotAllowedError } from "@/core/errors/not-allowed-error"

let companyRepository: InMemoryCompanyRepository
let managerRepository: InMemoryManagerRepository
let sut: CreateCompanyUseCase

describe('Create Company Use Case', () => {

  beforeEach(() => {
    managerRepository = new InMemoryManagerRepository()
    companyRepository = new InMemoryCompanyRepository()
    sut = new CreateCompanyUseCase(companyRepository, managerRepository)
  })

  it('should be able to create a company', async () => {
    const managerId = new UniqueId(faker.string.uuid())

    managerRepository.create(Manager.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password_hash: await hash(faker.internet.password(), 6),
    }, managerId))

    const payload = {
      name: faker.company.name(),
      managerId: managerId.toString,
    }

    await sut.execute(payload)
    expect(companyRepository.items[0].id).toEqual(expect.any(UniqueId))
    expect(companyRepository.items[0].managerId.toString).toEqual(managerId.toString)
  })

  it('should not be able to create a company without a valid manager', async () => {
    const payload = {
      name: faker.company.name(),
      managerId: randomUUID(),
    }

    const result = await sut.execute(payload)
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
