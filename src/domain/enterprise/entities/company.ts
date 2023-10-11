import { Entity } from "@/core/entities/entity";
import { UniqueId } from "@/core/entities/value-objects/unique-id";

export interface ICompany {
  name: string;
  manager_id: UniqueId
}

export class Company extends Entity<ICompany> {
  get name() {
    return this.props.name
  }

  set name(value: string) {
    this.props.name = value
  }

  get managerId() {
    return this.props.manager_id
  }

  static create(props: ICompany, id?: UniqueId) {
    const company = new Company(props, id)

    return company
  }
}
