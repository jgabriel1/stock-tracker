import { Algorithm } from 'jsonwebtoken'

export default {
  SECRET: process.env.TOKEN_SECRET || 'supersecret123',
  ALGORITHM: (process.env.TOKEN_ALGORITHM as Algorithm) || 'none',
}
