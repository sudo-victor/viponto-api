import { afterEach } from "node:test"
import { randomUUID } from "crypto"
import { faker } from "@faker-js/faker"
import { describe, it, expect, beforeEach, vi } from "vitest"

import { RegisterTimeTrackUseCase } from "."
import { InMemoryTimeTrackRepository } from "test/repositories/in-memory-time-track-repository"
import { makeTimeTrack } from "test/factories/make-time-track"

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

    await expect(() => sut.execute(payload)).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to update a time track that doesnt exists', async () => {
    const payload = {
      description: faker.lorem.text(),
      registeredAt: faker.date.soon(),
      timeTrackId: faker.string.uuid(),
      userId: faker.string.uuid()
    }

    await expect(() => sut.execute(payload)).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to update a time track if user id diff', async () => {
    const timeTrack = await makeTimeTrack({})

    await timeTrackRepository.create(timeTrack)

    const payload = {
      description: faker.lorem.text(),
      registeredAt: faker.date.soon(),
      timeTrackId: timeTrack.id.toString,
      userId: randomUUID()
    }

    await expect(() => sut.execute(payload)).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to update a time track if there is another time track with the same register time ', async () => {
    const existingDate = new Date(2023, 10, 15, 12, 30)
    await timeTrackRepository.create(await makeTimeTrack({}))
    await timeTrackRepository.create(await makeTimeTrack({ registered_at: existingDate }))

    const [timeTrack1] = timeTrackRepository.items

    const payload = {
      description: faker.lorem.text(),
      registeredAt: existingDate,
      timeTrackId: timeTrack1.id.toString,
      userId: timeTrack1.ownerId.toString
    }

    await expect(() => sut.execute(payload)).rejects.toBeInstanceOf(Error)
  })
})
