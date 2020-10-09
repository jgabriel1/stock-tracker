import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { AuthTokenService } from '../services/AuthTokenService'

export class AuthenticateUserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body

    const authToken = container.resolve(AuthTokenService)

    const token = await authToken.execute({ username, password })

    return response.json({ access_token: token, token_type: 'bearer' })
  }
}
