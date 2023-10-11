import { hash } from 'bcryptjs'

import { Workspace } from '@/domain/users/enterprise/entities/workspace'
import { type WorkspaceRepository } from '../../repositories/workspace-repository'
import { UniqueId } from '@/core/entities/value-objects/unique-id'
import { CompanyRepository } from '../../repositories/company-repository'

interface CreateWorkspaceUseCaseRequest {
  name: string
  description?: string
  companyId: string
  userId: string
}

interface CreateWorkspaceUseCaseResponse {
  workspace: Workspace
}

export class CreateWorkspaceUseCase {
  constructor (
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute ({
    name,
    description,
    companyId,
    userId
  }: CreateWorkspaceUseCaseRequest): Promise<CreateWorkspaceUseCaseResponse> {
    const company = await this.companyRepository.findById(companyId)

    if (!company) {
      throw new Error('Company not found')
    }

    if (company.managerId.toString !== userId) {
      throw new Error('Not allowed')
    }

    const workspace = Workspace.create({ name, description, company_id: new UniqueId(companyId) })

    const workspaceAlreadyExists = await this.workspaceRepository.findBySlug(workspace.slug.value)
    if (workspaceAlreadyExists) {
      throw new Error('Workspace already exists')
    }

    await this.workspaceRepository.create(workspace)

    return {
      workspace
    }
  }
}
