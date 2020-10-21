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
  constructor(
    @inject(UsersRepository)
    private usersRepository: UsersRepository,
    @inject(TransactionsRepository)
    private transactionsRepository: TransactionsRepository,
    @inject(StockInfoRepository)
    private stockInfoRepository: StockInfoRepository,
  ) {}

  public async execute({
    userId,
    stockTicker,
    stockFullName,
    value,
    quantity,
    type,
  }: Request): Promise<void> {
    await this.transactionsRepository.beginTransaction()
    const { session } = this.transactionsRepository

    // 1 - check if stock already exists while grabbing it's id, if it doesn't exist,
    // create it and also return the id
    let stockId: string

    const stockAlreadyExists = await this.stockInfoRepository.findByTicker(
      stockTicker,
      session,
    )

    if (stockAlreadyExists) {
      stockId = stockAlreadyExists._id.toHexString()
    } else {
      const newStockInfo = await this.stockInfoRepository.create(
        {
          ticker: stockTicker,
          fullName: stockFullName,
        },
        session,
      )

      stockId = newStockInfo._id.toHexString()
    }

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
      session,
    )

    await this.usersRepository.addTransaction(
      {
        userId,
        transaction: newTransaction,
      },
      session,
    )

    await session?.commitTransaction()
  }
}
