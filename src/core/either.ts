export class Left<L, R> {
  readonly value: L

  constructor(value: L) {
    this.value = value
  }

  isRight() {
    return false
  }

  isLeft() {
    return true
  }
}

export class Right<L, R> {
  readonly value: R

  constructor(value: R) {
    this.value = value
  }

  isRight() {
    return true
  }

  isLeft() {
    return false
  }
}

export type Either<L, R> = Left<L, R> | Right<L, R>

export const left = <L, R>(value: any): Either<L, R> => {
  return new Left(value)
}

export const right = <L, R>(value: any): Either<L, R> => {
  return new Right(value)
}
