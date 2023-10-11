import { Entity } from '@/core/entities/entity'

export interface IEmployee {
  name: string
  email: string
  password_hash: string
  created_at: Date
}

export class Employee extends Entity<IEmployee> {
  get name () {
    return this.props.name
  }

  get email () {
    return this.props.email
  }
}
