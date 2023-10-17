import { describe, expect, it } from "vitest";
import { accumulateTimeDifferencesInHours } from "./accumulate-time-diff-in-hours";
import { makeTimeTrack } from "test/factories/make-time-track";

describe("Accumulate time diff in hours", () => {
  it("should be able to sum and accumulate each timetracks in hours", async () => {
    const result = accumulateTimeDifferencesInHours([
      await makeTimeTrack({ registered_at: new Date(2023, 14, 10, 10, 0) }),
      await makeTimeTrack({ registered_at: new Date(2023, 14, 10, 11, 0) }),
      await makeTimeTrack({ registered_at: new Date(2023, 14, 10, 12, 0) }),
      await makeTimeTrack({ registered_at: new Date(2023, 14, 10, 12, 30) }),
    ])

    expect(result).toEqual(1.5)
  })
})