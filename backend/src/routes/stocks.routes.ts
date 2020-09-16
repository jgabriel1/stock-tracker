import { Router } from 'express'
import { container } from 'tsyringe'
import { checkAuthentication } from '../middlewares/checkAuthentication'
import { TransactionsRepository } from '../repositories/TransactionsRepository'

const stocksRouter = Router()

stocksRouter.use(checkAuthentication)

stocksRouter.get('/', async (request, response) => {
  const transactionsRepo = container.resolve(TransactionsRepository)

  await transactionsRepo.getStocksWallet(request.user._id)

  return response.send()
})

export { stocksRouter }
