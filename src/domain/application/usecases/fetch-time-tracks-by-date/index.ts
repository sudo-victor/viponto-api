import dayjs from "dayjs"

import { TimeTrack } from "@/domain/enterprise/entities/time-track";
import { TimeTrackRepository } from "../../repositories/time-track-repository";
import { Either, right } from "@/core/either";

interface FetchTimeTracksByDateUseCaseRequest {
  workspaceId: string
  userId: string
  date: string | Date
}

type FetchTimeTracksByDateUseCaseResponse = Either<
  null,
  {
    timeTracks: TimeTrack[]
    hours: number
  }
>

export class FetchTimeTracksByDateUseCase {

  constructor(
    private timeTrackRepository: TimeTrackRepository
  ) {}

  async execute({
    userId,
    workspaceId,
    date,
  }: FetchTimeTracksByDateUseCaseRequest): Promise<FetchTimeTracksByDateUseCaseResponse> {
    const timeTracks = await this.timeTrackRepository.findManyByDate({
      ownerId: userId,
      workspaceId,
      date
    })

    return right({
      timeTracks,
      hours: this.accumulateTimeDifferencesInHours(timeTracks)
    })
  }

  private accumulateTimeDifferencesInHours(timeTracks: TimeTrack[]): number {
    let totalHours = 0;
  
    for (let i = 0; i < timeTracks.length - 1; i += 2) {
      const registeredAt1 = dayjs(timeTracks[i].registeredAt);
      const registeredAt2 = dayjs(timeTracks[i + 1].registeredAt);
      const timeDifferenceInHours = registeredAt2.diff(registeredAt1, 'hour', true);
      totalHours += timeDifferenceInHours;
    }
  
    return totalHours;
  }
}