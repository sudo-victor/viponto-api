import { type Workspace } from '../../enterprise/entities/workspace'

export interface WorkspaceRepository {
  create: (workspace: Workspace) => Promise<void>
  findById: (id: string) => Promise<Workspace | null>
  findBySlug: (slug: string) => Promise<Workspace | null>
}
