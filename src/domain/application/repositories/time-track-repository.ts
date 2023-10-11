import { type TimeTrack } from '../../enterprise/entities/time-track'

export interface IFindByOwnerAndTimeParams {
  ownerId: string,
  time: string | Date
}

export interface TimeTrackRepository {
  create: (timetrack: TimeTrack) => Promise<void>
  findByOwnerAndTime: (params: IFindByOwnerAndTimeParams) => Promise<TimeTrack | null>
  findById: (id: string) => Promise<TimeTrack | null>
}
