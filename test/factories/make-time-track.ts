import { UniqueId } from "@/core/entities/value-objects/unique-id";
import { Workspace } from "@/domain/enterprise/entities/workspace";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";

interface IMakeTimeTrack { 
  id?: UniqueId
}

export async function makeTimeTrack({ id }: IMakeTimeTrack) {
  return Workspace.create({
    name: faker.lorem.word(),
    description: faker.lorem.text(),
    company_id: new UniqueId(randomUUID()),
  }, id)
}