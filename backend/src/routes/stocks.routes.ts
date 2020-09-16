import { Router } from 'express'
import { container } from 'tsyringe'
import { checkAuthentication } from '../middlewares/checkAuthentication'
import { StocksWalletService } from '../services/StocksWalletService'

const stocksRouter = Router()

stocksRouter.use(checkAuthentication)

stocksRouter.get('/', async (request, response) => {
  try {
    const { _id: userId } = request.user

    const stocksWallet = container.resolve(StocksWalletService)

    const stocks = await stocksWallet.execute({ userId })

    return response.json(stocks)
  } catch (err) {
    return response.status(400).json({ message: err.message })
  }
})

export { stocksRouter }
