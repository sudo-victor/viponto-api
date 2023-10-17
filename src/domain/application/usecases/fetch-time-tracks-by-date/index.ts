import dayjs from "dayjs"

import { TimeTrack } from "@/domain/enterprise/entities/time-track";
import { TimeTrackRepository } from "../../repositories/time-track-repository";
import { Either, right } from "@/core/either";
import { accumulateTimeDifferencesInHours } from "../../rules/accumulate-time-diff-in-hours";

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
      hours: accumulateTimeDifferencesInHours(timeTracks)
    })
  }
}