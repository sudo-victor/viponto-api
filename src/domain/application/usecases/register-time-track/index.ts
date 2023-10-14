import { type WorkspaceRepository } from '../../repositories/workspace-repository'
import { UniqueId } from '@/core/entities/value-objects/unique-id'
import { CompanyRepository } from '../../repositories/company-repository'
import { TimeTrack } from '@/domain/enterprise/entities/time-track'
import { TimeTrackRepository } from '../../repositories/time-track-repository'
import { Either, left, right } from '@/core/either'
import { ResourceAlreadyExistsError } from '@/core/errors/resource-already-exists-error'

interface RegisterTimeTrackUseCaseRequest {
  ownerId: string
  workspaceId: string
  description?: string
}

type RegisterTimeTrackUseCaseResponse = Either<
  ResourceAlreadyExistsError,
  {
    timeTrack: TimeTrack
  }
>

export class RegisterTimeTrackUseCase {
  constructor (
    private readonly timeTrackRepository: TimeTrackRepository,
  ) {}

  async execute ({
    ownerId,
    workspaceId,
    description
  }: RegisterTimeTrackUseCaseRequest): Promise<RegisterTimeTrackUseCaseResponse> {
    const timeTrackAlreadyExists = await this.timeTrackRepository.findByOwnerAndTime({
      ownerId,
      time: new Date()
    })

    if (timeTrackAlreadyExists) {
      return left(new ResourceAlreadyExistsError())
    }

    const timeTrack = TimeTrack.create({
      owner_id: new UniqueId(ownerId),
      workspace_id: new UniqueId(workspaceId),
      description
    })

    await this.timeTrackRepository.create(timeTrack)

    return right({ timeTrack })
  }
}
