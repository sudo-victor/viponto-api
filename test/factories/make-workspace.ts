import { UniqueId } from "@/core/entities/value-objects/unique-id";
import { WorkspaceValue } from "@/domain/enterprise/entities/value-objects/period-type";
import { Workspace } from "@/domain/enterprise/entities/workspace";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";

interface IMakeWorkspace { 
  id?: UniqueId
}

export async function makeWorkspace({ id }: IMakeWorkspace) {
  return Workspace.create({
    name: faker.lorem.word(),
    description: faker.lorem.text(),
    company_id: new UniqueId(randomUUID()),
    value: new WorkspaceValue({ period_type: 'hour', value: 50 })
  }, id)
}