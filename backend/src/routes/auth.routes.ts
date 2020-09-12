import { Router } from 'express'
import { container } from 'tsyringe'
import { RegisterUserService } from '../services/RegisterUserService'

const authRouter = Router()

authRouter.get('/register', async (request, response) => {
  const registerUser = container.resolve(RegisterUserService)

  const message = registerUser.execute()

  return response.status(201).json({ message })
})

export { authRouter }
