import { Entity } from '@/core/entities/entity'
import { type UniqueId } from '@/core/entities/value-objects/unique-id'

export interface IManager {
  name: string
  email: string
  password_hash: string
  created_at?: Date
}

export class Manager extends Entity<IManager> {
  get name () {
    return this.props.name
  }

  get email () {
    return this.props.email
  }
  get password () {
    return this.props.password_hash
  }

  static create (props: IManager, id?: UniqueId) {
    const manager = new Manager({
      ...props,
      created_at: props.created_at ?? new Date()
    }, id)
    return manager
  }
}
