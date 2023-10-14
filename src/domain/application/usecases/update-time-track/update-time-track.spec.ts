import { afterEach } from "node:test"
import { randomUUID } from "crypto"
import { faker } from "@faker-js/faker"
import { describe, it, expect, beforeEach, vi } from "vitest"

import { RegisterTimeTrackUseCase } from "."
import { InMemoryTimeTrackRepository } from "test/repositories/in-memory-time-track-repository"
import { makeTimeTrack } from "test/factories/make-time-track"
import { TimeUpdateToFutureDateError } from "@/core/errors/time-update-to-future-date-error"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { NotAllowedError } from "@/core/errors/not-allowed-error"
import { DateConflictError } from "@/core/errors/date-conflict-error"
import { UniqueId } from "@/core/entities/value-objects/unique-id"

let timeTrackRepository: InMemoryTimeTrackRepository
let sut: RegisterTimeTrackUseCase

describe('Update Workspace Use Case', () => {

  beforeEach(() => {
    timeTrackRepository = new InMemoryTimeTrackRepository()
    sut = new RegisterTimeTrackUseCase(timeTrackRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to update a time track in a workspace', async () => {
    const timeTrack = await makeTimeTrack({})
    const oldDate = timeTrack.registeredAt

    await timeTrackRepository.create(timeTrack)

    const payload = {
      description: faker.lorem.text(),
      registeredAt: faker.date.past(),
      timeTrackId: timeTrack.id.toString,
      userId: timeTrack.ownerId.toString
    }

    await sut.execute(payload)

    expect(new Date(timeTrackRepository.items[0].registeredAt).getTime()).not.toEqual(new Date(oldDate).getTime())
  })

  it('should not be able to update a time track with a future date', async () => {
    const timeTrack = await makeTimeTrack({})

    await timeTrackRepository.create(timeTrack)

    const payload = {
      description: faker.lorem.text(),
      registeredAt: faker.date.soon(),
      timeTrackId: timeTrack.id.toString,
      userId: timeTrack.ownerId.toString
    }

    const result = await sut.execute(payload)

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(TimeUpdateToFutureDateError)
  })

  it('should not be able to update a time track that doesnt exists', async () => {
    const payload = {
      description: faker.lorem.text(),
      registeredAt: faker.date.past(),
      timeTrackId: faker.string.uuid(),
      userId: faker.string.uuid()
    }

    const result = await sut.execute(payload)

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to update a time track if user id diff', async () => {
    const timeTrack = await makeTimeTrack({})

    await timeTrackRepository.create(timeTrack)

    const payload = {
      description: faker.lorem.text(),
      registeredAt: faker.date.past(),
      timeTrackId: timeTrack.id.toString,
      userId: randomUUID()
    }

    const result = await sut.execute(payload)

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('should not be able to update a time track if there is another time track with the same register time ', async () => {
    const existingDate = faker.date.past()
    await timeTrackRepository.create(await makeTimeTrack({ owner_id: new UniqueId('1') }))
    await timeTrackRepository.create(await makeTimeTrack({ owner_id: new UniqueId('1') , registered_at: existingDate }))

    const [timeTrack1] = timeTrackRepository.items

    const payload = {
      description: faker.lorem.text(),
      registeredAt: existingDate,
      timeTrackId: timeTrack1.id.toString,
      userId: timeTrack1.ownerId.toString
    }

    const result = await sut.execute(payload)

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(DateConflictError)
  })
})
