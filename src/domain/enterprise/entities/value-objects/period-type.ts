interface IValue { period_type: 'hour' | 'month'; value: number }

export class WorkspaceValue {
  private value: IValue

  constructor(props: { period_type: 'hour' | 'month', value: number }) {
    this.value = props
  }

  toValue() {
    return this.value
  }

  toString() {
    return `R$ ${this.value.value} por ${this.value.period_type}`; 
  }

  static create(props: IValue) {
    const workspaceValue = new WorkspaceValue(props)

    return workspaceValue
  }

}