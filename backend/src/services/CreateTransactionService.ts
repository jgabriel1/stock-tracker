import { ClientSession, startSession } from 'mongoose'
import { inject, injectable } from 'tsyringe'
import { HttpException } from '../errors/HttpException'
import { StockInfoRepository } from '../repositories/StockInfoRepository'
import { TransactionsRepository } from '../repositories/TransactionsRepository'
import { UsersRepository } from '../repositories/UsersRepository'

interface Request {
  userId: string
  stockTicker: string
  stockFullName: string
  value: number
  quantity: number
  type: 'income' | 'outcome'
}

@injectable()
export class CreateTransactionService {
  private session?: ClientSession

  constructor(
    @inject(UsersRepository)
    private usersRepository: UsersRepository,
    @inject(TransactionsRepository)
    private transactionsRepository: TransactionsRepository,
    @inject(StockInfoRepository)
    private stockInfoRepository: StockInfoRepository,
  ) {}

  private async getStockId(ticker: string, fullName: string): Promise<string> {
    const stockInfo = await this.stockInfoRepository.findByTicker(
      ticker,
      this.session,
    )

    if (!stockInfo) {
      const newStockInfo = await this.stockInfoRepository.create(
        {
          ticker,
          fullName,
        },
        this.session,
      )

      return newStockInfo._id.toHexString()
    }

    return stockInfo._id.toHexString()
  }

  private async beginTransaction(): Promise<void> {
    this.session = await startSession()
    this.session.startTransaction()
  }

  public async execute({
    userId,
    stockTicker,
    stockFullName,
    value,
    quantity,
    type,
  }: Request): Promise<void> {
    this.beginTransaction()

    // 1 - check if stock already exists while grabbing it's id, if it doesn't exist,
    // create it and also return the id
    const stockId = await this.getStockId(stockTicker, stockFullName)

    // 2 - In case of an outcome transaction, don't allow it to be created if it
    // is greater than that sotck's balance itself.
    if (type === 'outcome') {
      const stock = await this.transactionsRepository.getStockWalletById(
        userId,
        stockId,
      )

      if (stock.currentlyOwnedShares < quantity) {
        throw new HttpException(
          'Cannot create an outcome transaction for more shares than you own.',
        )
      }
    }

    // 3 - call transaction repo and create it returning void.
    const newTransaction = await this.transactionsRepository.create(
      {
        stockId,
        value,
        quantity,
        type,
        creatorId: userId,
      },
      this.session,
    )

    await this.usersRepository.addTransaction(
      {
        userId,
        transaction: newTransaction,
      },
      this.session,
    )

    await this.session?.commitTransaction()
  }
}
