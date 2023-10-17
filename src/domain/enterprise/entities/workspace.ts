import { Entity } from '@/core/entities/entity'
import { type UniqueId } from '@/core/entities/value-objects/unique-id'
import { Slug } from './value-objects/slug'
import { WorkspaceValue } from './value-objects/period-type'

export interface IWorkspace {
  name: string
  description?: string
  slug: Slug
  company_id: UniqueId,
  value: WorkspaceValue
  created_at?: Date
}

export class Workspace extends Entity<IWorkspace> {
  get name () {
    return this.props.name
  }

  get description () {
    return this.props.description
  }

  get slug () {
    return this.props.slug
  }

  get value () {
    return this.props.value
  }

  get companyId () {
    return this.props.company_id
  }

  static create (props: Partial<IWorkspace>, id?: UniqueId) {
    const workspace = new Workspace({
      ...props,
      slug: props.slug ?? Slug.createFromText(props?.name ?? "teste"),
      created_at: props.created_at ?? new Date()
    }, id)
    return workspace
  }
}
