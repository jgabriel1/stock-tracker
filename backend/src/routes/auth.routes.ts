import { Router, urlencoded } from 'express'
import { container } from 'tsyringe'
import { AuthTokenService } from '../services/AuthTokenService'
import { RegisterUserService } from '../services/RegisterUserService'

const authRouter = Router()

authRouter.post('/register', async (request, response) => {
  try {
    const { username, password, email } = request.body

    const registerUser = container.resolve(RegisterUserService)

    const newUser = await registerUser.execute({ username, password, email })

    return response.status(201).json({ ...newUser })
  } catch (err) {
    return response.status(400).json({ message: err.message })
  }
})

authRouter.post(
  '/token',
  urlencoded({ extended: true }),
  async (request, response) => {
    try {
      const { username, password } = request.body

      const authToken = container.resolve(AuthTokenService)

      const token = await authToken.execute({ username, password })

      return response.json({ access_token: token, token_type: 'bearer' })
    } catch (err) {
      return response.status(400).json({ message: err.message })
    }
  },
)

export { authRouter }
