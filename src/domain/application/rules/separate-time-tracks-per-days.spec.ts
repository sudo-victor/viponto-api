import { describe, expect, it } from "vitest";
import { separateTimeTracksPerDays } from "./separate-time-tracks-per-days";
import { makeTimeTrack } from "test/factories/make-time-track";
import { TimeTrack } from "@/domain/enterprise/entities/time-track";

describe("Separate time tracks per days", () => {
  it("should be able to separate time tracks per days", async () => {
    const result = separateTimeTracksPerDays([
      await makeTimeTrack({ registered_at: new Date(2023, 14, 10, 10, 0) }),
      await makeTimeTrack({ registered_at: new Date(2023, 14, 10, 11, 0) }),
      await makeTimeTrack({ registered_at: new Date(2023, 13, 10, 12, 0) }),
      await makeTimeTrack({ registered_at: new Date(2023, 13, 10, 12, 30) }),
    ])

    const expected = {
      '2024-03-10': [
        expect.any(TimeTrack),
        expect.any(TimeTrack)
      ],
      '2024-02-10': [
        expect.any(TimeTrack),
        expect.any(TimeTrack)
      ]
    }

    expect(result).toEqual(expected)
  })
})