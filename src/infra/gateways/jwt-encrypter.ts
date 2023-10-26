import { Encrypter } from "@/domain/application/criptography/encrypter";
import { env } from "@/env";
import * as jwt from 'jsonwebtoken'

export class JwtEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    const privateKey = Buffer.from(env.JWT_PRIVATE_KEY, 'base64')

    const token = jwt.sign(payload,
      privateKey,
      {
        expiresIn: '15min',
        algorithm: 'RS256'
      })

    return token
  }
}