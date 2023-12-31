import { describe, it, expect, beforeEach } from "vitest"
import { faker } from "@faker-js/faker"
import { hash } from "bcryptjs"

import { AuthenticateUseCase } from "."

import { InMemoryManagerRepository } from "test/repositories/in-memory-manager-repository"

import { Manager } from "@/domain/enterprise/entities/manager"
import { InvalidCredentialsError } from "@/core/errors/invalid-credentials-error"
import { JwtEncrypter } from "@/infra/gateways/jwt-encrypter"
import { BcryptHasher } from "@/infra/gateways/bcrypt-hash"

let managerRepository: InMemoryManagerRepository
let encrypter: JwtEncrypter
let hasher: BcryptHasher
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {

  beforeEach(() => {
    managerRepository = new InMemoryManagerRepository()
    encrypter = new JwtEncrypter()
    hasher = new BcryptHasher()
    sut = new AuthenticateUseCase(
      managerRepository,
      encrypter,
      hasher
    )
  })

  it('should be able to create a session for a manager', async () => {
    const payload = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password_hash: faker.internet.password(),
    }

    managerRepository.create(Manager.create({ ...payload, password_hash: await hash(payload.password_hash, 6) }))

    const result = await sut.execute({
      email: payload.email,
      password: payload.password_hash
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(expect.any(Object))
  })

  it('should not be able to create a session to an unexisting manager', async () => {
    const payload = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }

    const result = await sut.execute(payload)

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to create a session with a wrong password', async () => {
    const payload = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password_hash: faker.internet.password(),
    }

    managerRepository.create(Manager.create(payload))

    const result = await sut.execute({
      email: payload.email,
      password: 'wrong-password'
    })

    expect(result.isLeft()).toBe(true)
  })
})
