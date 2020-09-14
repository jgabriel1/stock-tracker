import { Router } from 'express'
import { checkAuthentication } from '../middlewares/checkAuthentication'

const transactionsRouter = Router()

transactionsRouter.use(checkAuthentication)

transactionsRouter.get('/', (request, response) => {
  return response.json(request.user)
})

export { transactionsRouter }
