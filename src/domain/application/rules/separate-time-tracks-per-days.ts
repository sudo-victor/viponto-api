import { TimeTrack } from "@/domain/enterprise/entities/time-track";
import dayjs from "dayjs";

export function separateTimeTracksPerDays(timeTracks: TimeTrack[]): Record<string, TimeTrack[]> {
  return timeTracks.reduce((result, timeTrack) => {
    const currentDate = dayjs(timeTrack.registeredAt)
      .second(0)
      .format('YYYY-MM-DD');

    if (!result[currentDate]) {
      result[currentDate] = [timeTrack];
    } else {
      result[currentDate].push(timeTrack);
    }

    return result;
  }, {} as Record<string, TimeTrack[]>);
}