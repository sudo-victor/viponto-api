import { describe, it, expect, beforeEach } from "vitest"
import { faker } from "@faker-js/faker"

import { CreateManagerUseCase } from "."
import { InMemoryManagerRepository } from "test/repositories/in-memory-manager-repository"
import { UniqueId } from "@/core/entities/value-objects/unique-id"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { BcryptHasher } from "@/infra/gateways/bcrypt-hash"

let managerRepository: InMemoryManagerRepository
let hasher: BcryptHasher
let sut: CreateManagerUseCase

describe('Create Manager Use Case', () => {

  beforeEach(() => {
    managerRepository = new InMemoryManagerRepository()
    hasher = new BcryptHasher()
    sut = new CreateManagerUseCase(managerRepository, hasher)
  })

  it('should be able to create a manager', async () => {
    const payload = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }

    await sut.execute(payload)

    expect(managerRepository.items[0].id).toEqual(expect.any(UniqueId))
  })

  it('should not be able to create a manager with an existing email', async () => {
    const payload = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }

    await sut.execute(payload)

    const result = await sut.execute(payload)

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsError)
  })
})
