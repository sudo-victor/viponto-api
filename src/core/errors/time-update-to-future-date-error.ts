export class TimeUpdateToFutureDateError extends Error {
  constructor() {
    super('Not allowed to update time to future date')
  }
}