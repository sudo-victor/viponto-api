import { compare } from 'bcryptjs'

import { Manager } from '@/domain/enterprise/entities/manager'
import { type ManagerRepository } from '../../repositories/manager-repository'
import { Either, left, right } from '@/core/either'
import { InvalidCredentialsError } from '@/core/errors/invalid-credentials-error'
import { Encrypter } from '../../criptography/encrypter'
import { Hasher } from '../../criptography/hasher'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = Either<
  InvalidCredentialsError,
  {
    manager: Manager
    token: string
  }
>

export class AuthenticateUseCase {
  constructor (
    private readonly managerRepository: ManagerRepository,
    private readonly encrypter: Encrypter,
    private readonly hasher: Hasher
  ) {}

  async execute ({
    email,
    password
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const manager = await this.managerRepository.findByEmail(email)

    if (!manager) {
      return left(new InvalidCredentialsError())
    }

    const doesPasswordIsValid = await this.hasher.compare(password, manager.password)
    if (!doesPasswordIsValid) {
      return left(new InvalidCredentialsError())
    }

    const token = this.encrypter.encrypt({ id: manager.id.toString })

    return right({
      token,
      manager
    })
  }
}
