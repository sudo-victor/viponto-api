import { UniqueId } from "@/core/entities/value-objects/unique-id";
import { Company } from "@/domain/users/enterprise/entities/company";
import { Manager } from "@/domain/users/enterprise/entities/manager";
import { faker } from "@faker-js/faker";
import { hash } from "bcryptjs";

interface IMakeCompany { 
  id?: UniqueId
  managerId: UniqueId
}

export function makeCompany({ id, managerId }: IMakeCompany) {
  return Company.create({
    name: faker.company.name(),
    manager_id: managerId,
  }, id)
}