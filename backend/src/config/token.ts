import dotenv from 'dotenv'
import { Algorithm, Secret } from 'jsonwebtoken'

dotenv.config()

interface ITokenConfig {
  SECRET: Secret
  ALGORITHM: Algorithm
}

export default {
  SECRET: process.env.TOKEN_SECRET || 'supersecret123',
  ALGORITHM: process.env.TOKEN_ALGORITHM || 'none',
} as ITokenConfig
