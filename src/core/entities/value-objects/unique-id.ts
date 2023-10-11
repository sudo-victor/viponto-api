import { randomUUID } from 'node:crypto'

export class UniqueId {
  private readonly _value: string

  get toString () {
    return this._value
  }

  get toValue () {
    return this._value
  }

  constructor (value?: string) {
    this._value = value ?? randomUUID()
  }
}
