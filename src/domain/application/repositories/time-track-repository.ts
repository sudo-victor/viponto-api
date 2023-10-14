import { type TimeTrack } from '../../enterprise/entities/time-track'

export interface IFindByOwnerAndTimeParams {
  ownerId: string
  time: string | Date
}

export interface IFindManyByOwnerAndWorkspace {
  ownerId: string;
  workspaceId: string;
  range: { start: Date | string; end: Date| string }
}

export interface IFindManyByDate {
  ownerId: string;
  workspaceId: string;
  date: Date | string
}

export interface TimeTrackRepository {
  create: (timetrack: TimeTrack) => Promise<void>
  findByOwnerAndTime: (params: IFindByOwnerAndTimeParams) => Promise<TimeTrack | null>
  findById: (id: string) => Promise<TimeTrack | null>
  findManyByOwnerAndWorkspace: (params: IFindManyByOwnerAndWorkspace) => Promise<TimeTrack[]>
  findManyByDate: (params: IFindManyByDate) => Promise<TimeTrack[]>
}
