import { hash } from 'bcryptjs'

import { Manager } from '@/domain/enterprise/entities/manager'
import { type ManagerRepository } from '../../repositories/manager-repository'

interface CreateManagerUseCaseRequest {
  name: string
  email: string
  password: string
}

interface CreateManagerUseCaseResponse {
  manager: Manager
}

export class CreateManagerUseCase {
  constructor (private readonly managerRepository: ManagerRepository) {}

  async execute ({
    name,
    email,
    password
  }: CreateManagerUseCaseRequest): Promise<CreateManagerUseCaseResponse> {
    const managerAlreadyExists = await this.managerRepository.findByEmail(email)
    if (managerAlreadyExists) {
      throw new Error('Manager already exists')
    }

    const manager = Manager.create({ name, email, password_hash: await hash(password, 6) })

    await this.managerRepository.create(manager)

    return {
      manager
    }
  }
}
