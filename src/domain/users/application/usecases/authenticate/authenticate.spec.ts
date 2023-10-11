import { describe, it, expect, beforeEach } from "vitest"
import { faker } from "@faker-js/faker"

import { AuthenticateUseCase } from "."
import { InMemoryManagerRepository } from "test/repositories/in-memory-manager-repository"
import { Manager } from "@/domain/users/enterprise/entities/manager"
import { hash } from "bcryptjs"

let managerRepository: InMemoryManagerRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {

  beforeEach(() => {
    managerRepository = new InMemoryManagerRepository()
    sut = new AuthenticateUseCase(managerRepository)
  })

  it('should be able to create a session for a manager', async () => {
    const payload = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password_hash: faker.internet.password(),
    }

    managerRepository.create(Manager.create({ ...payload, password_hash: await hash(payload.password_hash, 6) }))

    const { token, manager } = await sut.execute({
      email: payload.email,
      password: payload.password_hash
    })

    expect(token).toEqual(expect.any(String))
    expect(managerRepository.items[0].id).toEqual(manager.id)
  })

  it('should not be able to create a session to an unexisting manager', async () => {
    const payload = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }

    await expect(() => 
      sut.execute(payload)
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to create a session with a wrong password', async () => {
    const payload = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password_hash: faker.internet.password(),
    }

    managerRepository.create(Manager.create(payload))

    await expect(() => 
      sut.execute({
        email: payload.email,
        password: 'wrong-password'
      })
    ).rejects.toBeInstanceOf(Error)
  })
})
