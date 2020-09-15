import { ClientSession } from 'mongoose'
import { inject, injectable } from 'tsyringe'
import { ITransaction, TransactionModel } from '../models/Transaction'
import { BaseRepository } from './BaseRepository'

interface CreateTransactionDTO {
  stockId: string
  creatorId: string
  value: number
  quantity: number
  type: 'income' | 'outcome'
}

@injectable()
export class TransactionsRepository extends BaseRepository<ITransaction> {
  constructor(
    @inject('Transaction')
    Model: TransactionModel,
  ) {
    super(Model)
  }

  public async create(
    { stockId, creatorId, value, quantity, type }: CreateTransactionDTO,
    session?: ClientSession,
  ): Promise<ITransaction> {
    try {
      const transaction = new this.Model({
        stockId,
        creatorId,
        value,
        quantity,
        type,
      })

      await transaction.save({ session })

      return transaction
    } catch (err) {
      await session?.abortTransaction()
      throw new Error(`Error creating transaction: ${err.message}`)
    }
  }
}
