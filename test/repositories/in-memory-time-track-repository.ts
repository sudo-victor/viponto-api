import { type TimeTrack } from '@/domain/enterprise/entities/time-track'
import { IFindByOwnerAndTimeParams, IFindManyByOwnerAndWorkspace, type TimeTrackRepository } from '@/domain/application/repositories/time-track-repository'
import { compareDate } from '@/core/utils/compare-date'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

export class InMemoryTimeTrackRepository implements TimeTrackRepository {
  items: TimeTrack[] = []

  async create (timetrack: TimeTrack) {
    this.items.push(timetrack)
  }

  async findByOwnerAndTime ({ ownerId, time }: IFindByOwnerAndTimeParams) {
    const timetrack = this.items
      .filter(item => item.ownerId.toString === ownerId && compareDate(item.registeredAt, time))

    if (timetrack.length === 0) {
      return null
    }

    return timetrack[0]
  }

  async findManyByOwnerAndWorkspace (params: IFindManyByOwnerAndWorkspace) {
    const timetracks = this.items
      .filter(item => (
        item.ownerId.toString === params.ownerId &&
        item.workspaceId.toString === params.workspaceId &&
        dayjs(item.registeredAt).isBetween(dayjs(params.range.start).add(1, 'day'), dayjs(params.range.end).subtract(1, 'day'))
      ))
      .sort((a, b) => b.registeredAt > a.registeredAt ? -1 : 1)

    return timetracks
  }

  async findById(id: string) {
    const timetrack = this.items.find(item => item.id.toString === id)

    if (!timetrack) {
      return null
    }

    return timetrack
  }
}
