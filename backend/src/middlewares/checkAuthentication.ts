import { verify } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors/AppError'

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
    throw new AppError('Missing authorization headers.', 401)
  }

  // headers format: "Bearer tokenhere123456"
  const [, token] = authorization.split(' ')

  try {
    const payload = verify(token, 'supersecret123', { algorithms: ['HS256'] })

    request.user = payload as TokenPayload

    return next()
  } catch {
    throw new AppError('Invalid credentials.', 401)
  }
}
