import { Router, urlencoded } from 'express'

import { RegisterUserController } from '../controllers/RegisterUserController'
import { AuthenticateUserController } from '../controllers/AuthenticateUserController'

const registerUserController = new RegisterUserController()
const authenticateUserController = new AuthenticateUserController()

const authRouter = Router()

authRouter.post('/register', registerUserController.create)
authRouter.post(
  '/token',
  urlencoded({ extended: true }),
  authenticateUserController.create,
)

export { authRouter }
