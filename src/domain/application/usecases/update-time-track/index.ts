import { TimeTrack } from '@/domain/enterprise/entities/time-track'
import { TimeTrackRepository } from '../../repositories/time-track-repository'
import { Either, left, right } from '@/core/either'
import { TimeUpdateToFutureDateError } from '@/core/errors/time-update-to-future-date-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { DateConflictError } from '@/core/errors/date-conflict-error'

interface RegisterTimeTrackUseCaseRequest {
  timeTrackId: string
  registeredAt: string | Date
  description: string
  userId: string
}

type RegisterTimeTrackUseCaseResponse = Either<
  TimeUpdateToFutureDateError | ResourceNotFoundError | NotAllowedError,
  {
    timeTrack: TimeTrack
  }
>

export class RegisterTimeTrackUseCase {
  constructor (
    private readonly timeTrackRepository: TimeTrackRepository,
  ) {}

  async execute ({
    timeTrackId,
    userId,
    registeredAt,
    description
  }: RegisterTimeTrackUseCaseRequest): Promise<RegisterTimeTrackUseCaseResponse> {
    if (new Date(registeredAt) > new Date()) {
      return left(new TimeUpdateToFutureDateError())
    }
    
    const timeTrack = await this.timeTrackRepository.findById(timeTrackId)

    if (!timeTrack) {
      return left(new ResourceNotFoundError())
    }

    if (timeTrack.ownerId.toString !== userId) {
      return left(new NotAllowedError())
    }

    const timeTrackAlreadyExists = await this.timeTrackRepository.findByOwnerAndTime({
      ownerId: userId,
      time: new Date(registeredAt)
    })

    if (timeTrackAlreadyExists) {
      return left(new DateConflictError())
    }

    timeTrack.registeredAt = new Date(registeredAt)
    timeTrack.description = description

    return right({ timeTrack })
  }
}
