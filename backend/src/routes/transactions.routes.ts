import { Router } from 'express'
import { container } from 'tsyringe'
import { checkAuthentication } from '../middlewares/checkAuthentication'
import { CreateTransactionService } from '../services/CreateTransactionService'
import { ListTransactionsService } from '../services/ListTransactionsService'

const transactionsRouter = Router()

transactionsRouter.use(checkAuthentication)

transactionsRouter.post('/', async (request, response) => {
  try {
    const { quantity, type, value, stockTicker, stockFullName } = request.body

    const createTransaction = container.resolve(CreateTransactionService)

    await createTransaction.execute({
      userId: request.user._id,
      quantity,
      type,
      value,
      stockTicker,
      stockFullName,
    })

    return response.status(204).send()
  } catch (err) {
    return response.status(400).json({ message: err.message })
  }
})

transactionsRouter.get('/', async (request, response) => {
  try {
    const { ticker, from, to } = request.query as {
      ticker?: string
      from?: string
      to?: string
    }

    const { _id: userId } = request.user

    const listTransactions = container.resolve(ListTransactionsService)

    const transactions = await listTransactions.execute({
      userId,
      ticker,
      from,
      to,
    })

    return response.json(transactions)
  } catch (err) {
    return response.status(400).json({ message: err.message })
  }
})

export { transactionsRouter }
