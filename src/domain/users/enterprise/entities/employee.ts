import { Entity } from '@/core/entities/entity'
import { UniqueId } from '@/core/entities/value-objects/unique-id'
import { Code } from './value-objects/Code'

export interface IEmployee {
  name: string
  code: Code
  password_hash: string
  company_id: UniqueId
  created_at?: Date
}

export class Employee extends Entity<IEmployee> {
  get name () {
    return this.props.name
  }

  get code () {
    return this.props.code
  }

  get companyId () {
    return this.props.company_id
  }

  static create(props: IEmployee, id?: UniqueId) {
    const employee = new Employee({
      ...props,
      created_at: props.created_at ?? new Date()
    })

    return employee
  }
}
