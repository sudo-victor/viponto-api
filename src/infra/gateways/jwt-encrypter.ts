import { Encrypter } from "@/domain/application/criptography/encrypter";
import { env } from "@/env";
import * as jwt from 'jsonwebtoken'

export class JwtEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    const token = await jwt.sign(payload, env.SECRET_KEY, {
      expiresIn: '15min'
    })

    return token
  }
}