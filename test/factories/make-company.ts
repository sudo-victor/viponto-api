import { UniqueId } from "@/core/entities/value-objects/unique-id";
import { Company } from "@/domain/enterprise/entities/company";
import { faker } from "@faker-js/faker";

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