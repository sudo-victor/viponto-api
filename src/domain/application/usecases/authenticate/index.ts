import { compare } from 'bcryptjs'
import { sign } from "jsonwebtoken"

import { Manager } from '@/domain/enterprise/entities/manager'
import { type ManagerRepository } from '../../repositories/manager-repository'
import { env } from '@/env'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  manager: Manager
  token: string
}

export class AuthenticateUseCase {
  constructor (private readonly managerRepository: ManagerRepository) {}

  async execute ({
    email,
    password
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const manager = await this.managerRepository.findByEmail(email)

    if (!manager) {
      throw new Error('Credentials invalid')
    }

    const doesPasswordIsValid = await compare(password, manager.password)
    if (!doesPasswordIsValid) {
      throw new Error('Credentials invalid')
    }

    const token = sign({ id: manager.id.toString }, env.SECRET_KEY, { expiresIn: '15m' })

    return {
      token, manager
    }
  }
}
