import { type WorkspaceRepository } from '../../repositories/workspace-repository'
import { UniqueId } from '@/core/entities/value-objects/unique-id'
import { CompanyRepository } from '../../repositories/company-repository'
import { Workspace } from '@/domain/enterprise/entities/workspace'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceAlreadyExistsError } from '@/core/errors/resource-already-exists-error'
import { WorkspaceValue } from '@/domain/enterprise/entities/value-objects/period-type'

export interface CreateWorkspaceUseCaseRequest {
  name: string
  description?: string
  companyId: string
  periodType: 'hour' | 'month'
  value: number
  userId: string
}

type CreateWorkspaceUseCaseResponse = Either<
  ResourceAlreadyExistsError | ResourceNotFoundError | NotAllowedError,
  {
    workspace: Workspace
  }
>

export class CreateWorkspaceUseCase {
  constructor (
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute ({
    name,
    description,
    companyId,
    userId,
    periodType,
    value
  }: CreateWorkspaceUseCaseRequest): Promise<CreateWorkspaceUseCaseResponse> {
    const company = await this.companyRepository.findById(companyId)

    if (!company) {
      return left(new ResourceNotFoundError())
    }

    if (company.managerId.toString !== userId) {
      return left(new NotAllowedError())
    }

    const workspace = Workspace.create({
      name,
      description,
      value: WorkspaceValue.create({ period_type: periodType, value }),
      company_id: new UniqueId(companyId)
    })

    const workspaceAlreadyExists = await this.workspaceRepository.findBySlug(workspace.slug.value)
    if (workspaceAlreadyExists) {
      return left(new ResourceAlreadyExistsError())
    }

    await this.workspaceRepository.create(workspace)

    return right({
      workspace
    })
  }
}
