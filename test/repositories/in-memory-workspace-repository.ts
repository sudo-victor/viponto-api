import { type WorkspaceRepository } from '@/domain/application/repositories/workspace-repository'
import { type Workspace } from '@/domain/users/enterprise/entities/workspace'

export class InMemoryWorkspaceRepository implements WorkspaceRepository {
  items: Workspace[] = []

  async create (workspace: Workspace) {
    this.items.push(workspace)
  }

  async findBySlug (slug: string) {
    const workspace = this.items.find(item => item.slug.value === slug)

    if (!workspace) {
      return null
    }

    return workspace
  }

  async findById(id: string) {
    const workspace = this.items.find(item => item.id.toString === id)

    if (!workspace) {
      return null
    }

    return workspace
  }
}
