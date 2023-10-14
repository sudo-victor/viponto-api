import { describe, it, expect, beforeEach, vi } from "vitest"
import { InMemoryTimeTrackRepository } from "test/repositories/in-memory-time-track-repository"
import { RegisterTimeTrackUseCase } from "."
import { Workspace } from "@/domain/enterprise/entities/workspace"
import { faker } from "@faker-js/faker"
import { randomUUID } from "crypto"
import { UniqueId } from "@/core/entities/value-objects/unique-id"
import { afterEach } from "node:test"

let timeTrackRepository: InMemoryTimeTrackRepository
let sut: RegisterTimeTrackUseCase

describe('Create Workspace Use Case', () => {

  beforeEach(() => {
    timeTrackRepository = new InMemoryTimeTrackRepository()
    sut = new RegisterTimeTrackUseCase(timeTrackRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to register a time track in a workspace', async () => {
    const workspace = Workspace.create({})

    const payload = {
      ownerId: randomUUID(),
      workspaceId: workspace.id.toString,
      description: faker.lorem.text(),
    }

    await sut.execute(payload)

    expect(timeTrackRepository.items[0].id).toEqual(expect.any(UniqueId))
  })

  it('should not be able to register a time track in a workspace if already exists a register with the same date and owner', async () => {
    vi.setSystemTime(new Date(2023, 10, 10, 12, 15))

    const workspace = Workspace.create({})

    const payload = {
      ownerId: randomUUID(),
      workspaceId: workspace.id.toString,
      description: faker.lorem.text(),
    }

    await sut.execute(payload)
    const result = await sut.execute(payload)

    expect(result.isLeft()).toBe(true)
  })
})
