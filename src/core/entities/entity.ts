import { UniqueId } from './value-objects/unique-id'

export class Entity<Props> {
  private readonly _id: UniqueId
  protected props: Props

  get id () {
    return this._id
  }

  constructor (props: any, id?: UniqueId) {
    this._id = id ?? new UniqueId(id)
    this.props = props
  }
}
