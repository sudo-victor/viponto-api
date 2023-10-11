import { TimeTrack } from '@/domain/enterprise/entities/time-track'
import { TimeTrackRepository } from '../../repositories/time-track-repository'

interface RegisterTimeTrackUseCaseRequest {
  timeTrackId: string
  registeredAt: string | Date
  description: string
  userId: string
}

interface RegisterTimeTrackUseCaseResponse {
  timeTrack: TimeTrack
}

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
      throw new Error('Time track cannot be update to a future date')
    }
    
    const timeTrack = await this.timeTrackRepository.findById(timeTrackId)

    if (!timeTrack) {
      throw new Error('Time track not found')
    }

    if (timeTrack.ownerId.toString !== userId) {
      throw new Error('Not allowed')
    }

    const timeTrackAlreadyExists = await this.timeTrackRepository.findByOwnerAndTime({
      ownerId: userId,
      time: new Date(registeredAt)
    })

    if (timeTrackAlreadyExists) {
      throw new Error('Conflict with an existing time track')
    }

    timeTrack.registeredAt = new Date(registeredAt)
    timeTrack.description = description

    return { timeTrack }
  }
}
