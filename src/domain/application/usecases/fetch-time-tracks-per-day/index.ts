import dayjs from "dayjs"

import { TimeTrack } from "@/domain/enterprise/entities/time-track";
import { TimeTrackRepository } from "../../repositories/time-track-repository";
import { Either, right } from "@/core/either";
import { separateTimeTracksPerDays } from "../../rules/separate-time-tracks-per-days";

interface FetchTimeTracksPerDayUseCaseRequest {
  workspaceId: string
  userId: string
  startRange?: string | Date
  endRange?: string | Date
}

type FetchTimeTracksPerDayUseCaseResponse = Either<
  null,
  {
    timeTracks: Record<string, TimeTrack[]>
  }
>

export class FetchTimeTracksPerDayUseCase {

  constructor(
    private timeTrackRepository: TimeTrackRepository
  ) {}

  async execute({
    userId,
    workspaceId,
    startRange,
    endRange
  }: FetchTimeTracksPerDayUseCaseRequest): Promise<FetchTimeTracksPerDayUseCaseResponse> {
    const timeTracks = await this.timeTrackRepository.findManyByOwnerAndWorkspace({
      ownerId: userId,
      workspaceId,
      range: {
        start: startRange ?? new Date(),
        end: endRange ?? dayjs(new Date()).subtract(4, 'days').toDate(),
      }
    })

    return right({
      timeTracks: separateTimeTracksPerDays(timeTracks)
    })
  }
}