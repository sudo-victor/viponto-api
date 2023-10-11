import { UniqueId } from "@/core/entities/value-objects/unique-id";
import { Manager } from "@/domain/users/enterprise/entities/manager";
import { faker } from "@faker-js/faker";
import { hash } from "bcryptjs";

interface IMakeManager { 
  id?: UniqueId
}

export async function makeManager({ id }: IMakeManager) {
  return Manager.create({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password_hash: await hash(faker.internet.password(), 6),
  }, id)
}