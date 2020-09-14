import { Router } from 'express'
import { container } from 'tsyringe'
import { RegisterUserService } from '../services/RegisterUserService'

const authRouter = Router()

authRouter.post('/register', async (request, response) => {
  const { username, password, email } = request.body

  try {
    const registerUser = container.resolve(RegisterUserService)

    const newUser = await registerUser.execute({ username, password, email })

    return response.status(201).json({ ...newUser })
  } catch (err) {
    return response.status(400).json({ message: err.message })
  }
})

export { authRouter }
