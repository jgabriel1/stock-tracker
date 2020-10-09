import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListTransactionsService } from '../services/ListTransactionsService'
import { CreateTransactionService } from '../services/CreateTransactionService'
import { TransactionExtraCostsService } from '../services/TransactionExtraCostsService'

export class TransactionsController {
  public async index(request: Request, response: Response): Promise<Response> {
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
  }

  public async create(request: Request, response: Response): Promise<Response> {
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
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id: transactionId } = request.params
    const { value } = request.body

    const updateExtraCosts = container.resolve(TransactionExtraCostsService)

    await updateExtraCosts.execute({ transactionId, value })

    return response.status(204).send()
  }
}
