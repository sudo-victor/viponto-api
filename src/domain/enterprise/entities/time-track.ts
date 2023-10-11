import { Entity } from '@/core/entities/entity'
import { type UniqueId } from '@/core/entities/value-objects/unique-id'

export interface ITimeTrack {
  workspace_id: UniqueId,
  owner_id: UniqueId,
  description?: string,
  registered_at: Date
}

export class TimeTrack extends Entity<ITimeTrack> {
  get workspaceId () {
    return this.props.workspace_id
  }

  get description () {
    return this.props.description
  }

  get ownerId () {
    return this.props.owner_id
  }

  get registeredAt () {
    return this.props.registered_at
  }

  static create (props: Partial<ITimeTrack>, id?: UniqueId) {
    const timetrack = new TimeTrack({
      ...props,
      registered_at: props.registered_at ?? new Date().getTime()
    }, id)
    return timetrack
  }
}
