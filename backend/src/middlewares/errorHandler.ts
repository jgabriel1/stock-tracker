import { Request, Response, NextFunction } from 'express'
import { HttpException } from '../errors/HttpException'

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): void {
  if (error instanceof HttpException) {
    response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })

    return
  }

  console.error(error)

  response.status(500).json({
    status: 'error',
    message: 'Internal Server Error.',
  })
}
