import { type TimeTrack } from '@/domain/enterprise/entities/time-track'
import { IFindByOwnerAndTimeParams, type TimeTrackRepository } from '@/domain/application/repositories/time-track-repository'
import { compareDate } from '@/core/utils/compare-date'

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

  async findById(id: string) {
    const timetrack = this.items.find(item => item.id.toString === id)

    if (!timetrack) {
      return null
    }

    return timetrack
  }
}
