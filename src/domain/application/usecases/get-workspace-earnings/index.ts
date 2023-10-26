import { Either, left, right } from "@/core/either";
import { WorkspaceRepository } from "../../repositories/workspace-repository";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { TimeTrackRepository } from "../../repositories/time-track-repository";
import { accumulateTimeDifferencesInHours } from "../../rules/accumulate-time-diff-in-hours";

interface GetWorkspaceEarningsRequest {
  workspaceId: string
  userId: string
  startRange: string | Date
  endRange: string | Date
}

type GetWorkspaceEarningsResponse = Either<
  ResourceNotFoundError,
  {
    periodType: 'hour' | 'month',
    value: number,
    accumulateTime: number,
    total: number
  }
>

export class GetWorkspaceEarnings {
  constructor(
    private workspaceRepository: WorkspaceRepository,
    private timeTracksRepository: TimeTrackRepository
  ) {}

  async execute({
    workspaceId,
    userId,
    startRange,
    endRange
  }: GetWorkspaceEarningsRequest): Promise<GetWorkspaceEarningsResponse> {
    const workspace = await this.workspaceRepository.findById(workspaceId)

    if (!workspace) {
      return left(new ResourceNotFoundError())
    }

    const timeTracks = await this.timeTracksRepository.findManyByOwnerAndWorkspace({
      ownerId: userId,
      workspaceId,
      range: {
        start: startRange,
        end: endRange,
      }
    })

    const { period_type: periodType, value } = workspace.value.toValue()
    const accumulateTime = accumulateTimeDifferencesInHours(timeTracks)
    const total = accumulateTime * value

    return right({
      periodType,
      value,
      accumulateTime,
      total
    })
  }
}