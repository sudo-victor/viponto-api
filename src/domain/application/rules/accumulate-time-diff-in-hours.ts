import { TimeTrack } from "@/domain/enterprise/entities/time-track";
import dayjs from "dayjs";

export function accumulateTimeDifferencesInHours(timeTracks: TimeTrack[]): number {
  let totalHours = 0;

  for (let i = 0; i < timeTracks.length - 1; i += 2) {
    const registeredAt1 = dayjs(timeTracks[i].registeredAt);
    const registeredAt2 = dayjs(timeTracks[i + 1].registeredAt);
    const timeDifferenceInHours = registeredAt2.diff(registeredAt1, 'hour', true);
    totalHours += timeDifferenceInHours;
  }
  
  return totalHours;
}