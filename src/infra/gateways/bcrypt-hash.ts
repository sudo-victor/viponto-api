import { Hasher } from "@/domain/application/criptography/hasher";
import { compare, hash } from "bcryptjs";

export class BcryptHasher implements Hasher {
  async hash(plain: string): Promise<string> {
    return await hash(plain, 6)
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return await compare(plain, hash)
  }
}