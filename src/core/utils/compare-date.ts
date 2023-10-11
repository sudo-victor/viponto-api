import dayjs from "dayjs";

export function compareDate(source: string | Date, target: string | Date) {
  const sourceDate = dayjs(new Date(source)).second(0)
  const targetDate = dayjs(new Date(target)).second(0)

  return sourceDate.isSame(targetDate)
}