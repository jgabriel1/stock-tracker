import { ClientSession, Types } from 'mongoose'
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

interface FindTransactionsDTO {
  userId: string
  tickerId: string
  from?: Date
  to?: Date
}

export interface StockWalletDTO {
  stockId: string
  ticker: string
  fullName: string
  totalInvested: number
  currentlyOwnedShares: number
  averageBoughtPrice: number
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

  public async findByStockId({
    userId,
    tickerId,
    from,
    to,
  }: FindTransactionsDTO): Promise<ITransaction[]> {
    const datesFilters = {
      ...(from && { $gte: from }),
      ...(to && { $lte: to }),
    }

    const transactions = await this.Model.find({
      creatorId: userId,
      stockId: tickerId,
      createdAt: { ...datesFilters },
    })

    return transactions
  }

  public async findById(transactionId: string): Promise<ITransaction> {
    const transaction = await this.Model.findById(transactionId)

    if (!transaction) {
      throw new Error('This transaction does not exist.')
    }

    return transaction
  }

  public async getStocksWallet(userId: string): Promise<StockWalletDTO[]> {
    const stocks = await this.Model.aggregate()
      .match({ creatorId: Types.ObjectId(userId) })
      .group({
        _id: '$stockId',
        totalInvested: {
          $sum: { $cond: [{ $eq: ['$type', 'income'] }, '$value', 0] },
        },

        totalSharesBought: {
          $sum: { $cond: [{ $eq: ['$type', 'income'] }, '$quantity', 0] },
        },

        totalSharesSold: {
          $sum: { $cond: [{ $eq: ['$type', 'outcome'] }, '$quantity', 0] },
        },
      })
      .project({
        _id: 0,
        stockId: '$_id',

        totalInvested: 1,

        currentlyOwnedShares: {
          $subtract: ['$totalSharesBought', '$totalSharesSold'],
        },

        averageBoughtPrice: {
          $divide: ['$totalInvested', '$totalSharesBought'],
        },
      })
      .lookup({
        from: 'stockinfos',
        localField: 'stockId',
        foreignField: '_id',
        as: 'stock',
      })
      .addFields({
        stockInfo: { $arrayElemAt: ['$stock', 0] },
      })
      .addFields({
        ticker: '$stockInfo.ticker',
        fullName: '$stockInfo.fullName',
      })
      .project({
        stockInfo: 0,
        stock: 0,
      })
    // .sort({ totalInvested: -1 }) maybe sort, don't know yet

    return stocks
  }
}
