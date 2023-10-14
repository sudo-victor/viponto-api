import { beforeEach, describe, expect, it } from "vitest";
import { randomUUID } from "crypto";

import { FetchTimeTracksByDateUseCase } from ".";
import { InMemoryTimeTrackRepository } from "test/repositories/in-memory-time-track-repository";
import { UniqueId } from "@/core/entities/value-objects/unique-id";
import { makeTimeTrack } from "test/factories/make-time-track";

let timeTrackRepository: InMemoryTimeTrackRepository
let sut: FetchTimeTracksByDateUseCase

describe("Fetch Time Tracks By Date Use Case", () => {
  beforeEach(() => {
    timeTrackRepository = new InMemoryTimeTrackRepository()
    sut = new FetchTimeTracksByDateUseCase(timeTrackRepository)
  })

  it('should be able to fetch time tracks by date', async () => {
    const ownerId = new UniqueId(randomUUID())
    const workspaceId = new UniqueId(randomUUID())

    const defaultTrack = {
      owner_id: ownerId,
      workspace_id: workspaceId
    }

    timeTrackRepository.create(await makeTimeTrack({ ...defaultTrack, registered_at: new Date(2023, 10, 1, 10, 0, 0 ) }))
    timeTrackRepository.create(await makeTimeTrack({ ...defaultTrack, registered_at: new Date(2023, 10, 1, 10, 30, 0 ) }))
    timeTrackRepository.create(await makeTimeTrack({ ...defaultTrack, registered_at: new Date(2023, 10, 1, 12, 0, 0 ) }))

    const result = await sut.execute({
      userId: ownerId.toString,
      workspaceId: workspaceId.toString,
      date: new Date(2023, 10, 1)
    })

    const THIRTY_MIN_IN_HOURS = 30 / 60

    expect(result.value?.hours).toEqual(THIRTY_MIN_IN_HOURS)
    expect(result.value?.timeTracks).toHaveLength(3)
  })
})