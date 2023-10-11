export class Code {
  private _value: string

  toString() {
    return this._value
  }

  toValue() {
    return this._value
  }

  constructor(value: string) {
    this._value = value.trim().replace(/\s/g, ' ').replace(/\s/g, '_')
  }

}