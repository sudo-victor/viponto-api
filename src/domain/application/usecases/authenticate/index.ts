import { compare } from 'bcryptjs'
import { sign } from "jsonwebtoken"

import { Manager } from '@/domain/enterprise/entities/manager'
import { type ManagerRepository } from '../../repositories/manager-repository'
import { env } from '@/env'
import { Either, left, right } from '@/core/either'
import { InvalidCredentialsError } from '@/core/errors/invalid-credentials-error'

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
  constructor (private readonly managerRepository: ManagerRepository) {}

  async execute ({
    email,
    password
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const manager = await this.managerRepository.findByEmail(email)

    if (!manager) {
      return left(new InvalidCredentialsError())
    }

    const doesPasswordIsValid = await compare(password, manager.password)
    if (!doesPasswordIsValid) {
      return left(new InvalidCredentialsError())
    }

    const token = sign({ id: manager.id.toString }, env.SECRET_KEY, { expiresIn: '15m' })

    return right({
      token,
      manager
    })
  }
}
