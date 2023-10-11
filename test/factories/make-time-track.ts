import { UniqueId } from "@/core/entities/value-objects/unique-id";
import { TimeTrack } from "@/domain/enterprise/entities/time-track";
import { Workspace } from "@/domain/enterprise/entities/workspace";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";

interface IMakeTimeTrack { 
  id?: UniqueId
  registered_at?: Date
}

export async function makeTimeTrack({ id, registered_at }: IMakeTimeTrack) {
  return TimeTrack.create({
    owner_id: new UniqueId(randomUUID()),
    workspace_id: new UniqueId(randomUUID()),
    registered_at: registered_at ?? new Date(),
    description: faker.lorem.text(),
  }, id)
}