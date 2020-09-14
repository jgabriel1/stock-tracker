import { verify } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

interface TokenPayload {
  _id: string
  username: string
  email: string
}

export function checkAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { authorization } = request.headers

  if (!authorization) {
    throw new Error('Missing authorization headers.')
  }

  // headers format: "Bearer tokenhere123456"
  const [, token] = authorization.split(' ')

  try {
    const payload = verify(token, 'supersecret123', { algorithms: ['HS256'] })

    request.user = payload as TokenPayload

    return next()
  } catch {
    throw new Error('Invalid credentials.')
  }
}
