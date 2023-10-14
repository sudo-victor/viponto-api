import { hash } from 'bcryptjs'

import { Manager } from '@/domain/enterprise/entities/manager'
import { type ManagerRepository } from '../../repositories/manager-repository'
import { Either, left, right } from '@/core/either'
import { ResourceAlreadyExistsError } from '@/core/errors/resource-already-exists-error'

interface CreateManagerUseCaseRequest {
  name: string
  email: string
  password: string
}

type CreateManagerUseCaseResponse = Either<
  ResourceAlreadyExistsError,
  {
    manager: Manager
  }
>

export class CreateManagerUseCase {
  constructor (private readonly managerRepository: ManagerRepository) {}

  async execute ({
    name,
    email,
    password
  }: CreateManagerUseCaseRequest): Promise<CreateManagerUseCaseResponse> {
    const managerAlreadyExists = await this.managerRepository.findByEmail(email)
    if (managerAlreadyExists) {
      return left(new ResourceAlreadyExistsError())
    }

    const manager = Manager.create({ name, email, password_hash: await hash(password, 6) })

    await this.managerRepository.create(manager)

    return right({
      manager
    })
  }
}
