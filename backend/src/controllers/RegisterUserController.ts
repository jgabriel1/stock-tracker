import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { RegisterUserService } from '../services/RegisterUserService'

export class RegisterUserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, password, email } = request.body

    const registerUser = container.resolve(RegisterUserService)

    const newUser = await registerUser.execute({
      username,
      password,
      email,
    })

    return response.status(201).json({ ...newUser })
  }
}
