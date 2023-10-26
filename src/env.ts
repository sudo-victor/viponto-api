import 'dotenv/config'
import z from 'zod'

const envSchema = z.object({
  SECRET_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  JWT_PRIVATE_KEY: z.string(),
})

export const env = envSchema.parse({ 
  SECRET_KEY: process.env.SECRET_KEY as string,
  JWT_PUBLIC_KEY: process.env.JWT_PUBLIC_KEY as string,
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY as string,
})