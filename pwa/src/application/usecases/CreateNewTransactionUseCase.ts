import { Stock } from '../../domain/models/Stock'
import { Transaction } from '../../domain/models/Transaction'
import {
  IStocksRepository,
  ITransactionsRepository,
} from '../../domain/repositories'
import { Ticker } from '../../domain/value-objects/Ticker'

interface IRequest {
  type: 'IN' | 'OUT'
  value: number
  quantity: number
  stockInfo: {
    ticker: string
    fullName: string
  }
}

export class CreateNewTransactionUseCase {
  private transactionsRepository: ITransactionsRepository

  private stocksRepository: IStocksRepository

  public constructor(
    transactionsRepository: ITransactionsRepository,
    stocksRepository: IStocksRepository,
  ) {
    this.transactionsRepository = transactionsRepository
    this.stocksRepository = stocksRepository
  }

  public async execute({
    type,
    value,
    quantity,
    stockInfo,
  }: IRequest): Promise<void> {
    let stock = await this.stocksRepository.findByTicker(
      Ticker.create(stockInfo.ticker),
    )

    if (!stock) {
      stock = Stock.create({
        ticker: stockInfo.ticker,
        fullName: stockInfo.fullName,
      })

      await this.stocksRepository.save(stock)
    }

    const transaction = Transaction.create({
      type,
      value,
      quantity,
      stockId: stock.id.value,
    })

    if (transaction.type === 'OUT') {
      await this.stocksRepository.loadBalance(stock)

      const maxPossibleOutcome = stock.balance?.currentlyOwnedShares.value || 0

      if (transaction.quantity.value > maxPossibleOutcome) {
        throw new Error('Invalid outcome transaction.')
      }
    }

    await this.transactionsRepository.save(transaction)
  }
}
