import { Entity } from '@/core/entities/entity'

export interface IManager {
  name: string
  email: string
  password_hash: string
  created_at: Date
}

export class Manager extends Entity<IManager> {
  get name () {
    return this.props.name
  }

  get email () {
    return this.props.email
  }
}
