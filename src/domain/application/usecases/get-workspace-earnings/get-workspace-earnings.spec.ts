import { describe, beforeEach, it, vi, expect } from "vitest";
import { GetWorkspaceEarnings } from ".";
import { WorkspaceRepository } from "../../repositories/workspace-repository";
import { TimeTrackRepository } from "../../repositories/time-track-repository";
import { InMemoryWorkspaceRepository } from "test/repositories/in-memory-workspace-repository";
import { InMemoryTimeTrackRepository } from "test/repositories/in-memory-time-track-repository";
import { makeWorkspace } from "test/factories/make-workspace";
import { randomUUID } from "crypto";
import { afterEach } from "node:test";
import { makeTimeTrack } from "test/factories/make-time-track";
import { UniqueId } from "@/core/entities/value-objects/unique-id";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";

let workspaceRepository: WorkspaceRepository
let timeTrackRepository: TimeTrackRepository
let sut: GetWorkspaceEarnings

describe("Get Workspace Earnings Use Case", () => {
  beforeEach(() => {
    workspaceRepository = new InMemoryWorkspaceRepository()
    timeTrackRepository = new InMemoryTimeTrackRepository()
    sut = new GetWorkspaceEarnings(workspaceRepository, timeTrackRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should be able to return the total earnings in current month", async () => {
    vi.setSystemTime(new Date(2023, 10, 10, 0,0,0))

    const ownerId = new UniqueId('123')

    const workspace = await makeWorkspace({})

    const defaultRepo = { owner_id: ownerId, workspace_id: workspace.id }

    await workspaceRepository.create(workspace)
    await timeTrackRepository.create(await makeTimeTrack({ ...defaultRepo, registered_at: new Date(2023, 10, 2, 12,0,0) }))
    await timeTrackRepository.create(await makeTimeTrack({ ...defaultRepo, registered_at: new Date(2023, 10, 2, 13,0,0) }))
    await timeTrackRepository.create(await makeTimeTrack({ ...defaultRepo, registered_at: new Date(2023, 10, 5, 12,0,0) }))
    await timeTrackRepository.create(await makeTimeTrack({ ...defaultRepo, registered_at: new Date(2023, 10, 5, 12,30,0) }))

    const result = await sut.execute({
      workspaceId: workspace.id.toString,
      userId: ownerId.toString,
      startRange: new Date(2023, 10, 1, 0,0,0),
      endRange: new Date(),
    })

    expect(result.isRight()).toBe(true)
    expect((result.value as { total: number }).total).toEqual(75)
  })

  it("should not be able to return the earnings if workspace not found", async () => {
    const result = await sut.execute({
      workspaceId: randomUUID(),
      userId: randomUUID(),
      startRange: new Date(2023, 10, 1, 0,0,0),
      endRange: new Date(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})