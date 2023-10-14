import { describe, it, expect, beforeEach } from "vitest"

import { FetchTimeTracksPerDayUseCase } from "."
import { UniqueId } from "@/core/entities/value-objects/unique-id"
import { InMemoryTimeTrackRepository } from "test/repositories/in-memory-time-track-repository"
import { makeTimeTrack } from "test/factories/make-time-track"
import { randomUUID } from "crypto"
import dayjs from "dayjs"

let timeTrackRepository: InMemoryTimeTrackRepository
let sut: FetchTimeTracksPerDayUseCase

describe('Fetch Time Tracks Per Day Use Case', () => {

  beforeEach(() => {
    timeTrackRepository = new InMemoryTimeTrackRepository()
    sut = new FetchTimeTracksPerDayUseCase(timeTrackRepository)
  })

  it('should be able to fetch time tracks per day', async () => {
    const ownerId = new UniqueId(randomUUID())
    const workspaceId = new UniqueId(randomUUID())
    const firstDate = new Date()
    const secondDate = dayjs(firstDate).subtract(1, 'days').toDate()

    for (let i = 1; i <= 5; i++) {
      timeTrackRepository.create(await makeTimeTrack({
        registered_at: i % 2 ? firstDate : secondDate,
        owner_id: ownerId,
        workspace_id: workspaceId
      }))
    }

    const result = await sut.execute({
      userId: ownerId.toString,
      workspaceId: workspaceId.toString,
    })

    const expectedTimeTracksKeys = [
      dayjs(secondDate).second(0).format('YYYY-MM-DD'),
      dayjs(firstDate).second(0).format('YYYY-MM-DD'),
    ].sort((a, b) => a > b ? 1 : -1)

    expect(Object.keys(result.value?.timeTracks)).toHaveLength(2)
    expect(Object.keys(result.value?.timeTracks)).toEqual(expectedTimeTracksKeys)
  })

  it('should be able to fetch time tracks per day between today and five days ago', async () => {
    const ownerId = new UniqueId(randomUUID())
    const workspaceId = new UniqueId(randomUUID())
    const firstDate = new Date()
    const secondDate = dayjs(firstDate).subtract(4, 'days').toDate()
    const thirdDate = dayjs(firstDate).subtract(5, 'days').toDate()

    for (let i = 1; i < 5; i++) {
      timeTrackRepository.create(await makeTimeTrack({
        registered_at: i % 2 ? firstDate : secondDate,
        owner_id: ownerId,
        workspace_id: workspaceId
      }))
    }

    timeTrackRepository.create(await makeTimeTrack({
      registered_at: thirdDate,
      owner_id: ownerId,
      workspace_id: workspaceId
    }))

    const result = await sut.execute({
      userId: ownerId.toString,
      workspaceId: workspaceId.toString,
    })

    const expectedTimeTracksKeys = [
      dayjs(secondDate).second(0).format('YYYY-MM-DD'),
      dayjs(firstDate).second(0).format('YYYY-MM-DD'),
    ].sort((a, b) => a > b ? 1 : -1)

    expect(Object.keys(result.value?.timeTracks)).toHaveLength(2)
    expect(Object.keys(result.value?.timeTracks)).toEqual(expectedTimeTracksKeys)
  })

  it('should be able to fetch time tracks per day between two dates', async () => {
    const ownerId = new UniqueId(randomUUID())
    const workspaceId = new UniqueId(randomUUID())
    const firstDate = dayjs(new Date()).second(0).subtract(10, 'days').toDate()
    const secondDate = dayjs(firstDate).subtract(20, 'days').toDate()
    const thirdDate = dayjs(firstDate).subtract(21, 'days').toDate()

    for (let i = 1; i <= 5; i++) {
      timeTrackRepository.create(await makeTimeTrack({
        registered_at: i % 2 ? firstDate : secondDate,
        owner_id: ownerId,
        workspace_id: workspaceId
      }))
    }

    timeTrackRepository.create(await makeTimeTrack({
      registered_at: thirdDate,
      owner_id: ownerId,
      workspace_id: workspaceId
    }))

    const result = await sut.execute({
      userId: ownerId.toString,
      workspaceId: workspaceId.toString,
      startRange: firstDate,
      endRange: secondDate,
    })

    const expectedTimeTracksKeys = [
      dayjs(secondDate).second(0).format('YYYY-MM-DD'),
      dayjs(firstDate).second(0).format('YYYY-MM-DD'),
    ].sort((a, b) => a > b ? 1 : -1)

    expect(Object.keys(result.value?.timeTracks)).toHaveLength(2)
    expect(Object.keys(result.value?.timeTracks)).toEqual(expectedTimeTracksKeys)
  })
})
