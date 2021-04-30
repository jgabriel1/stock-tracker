import {
  IStocksRepository,
  ITransactionsRepository,
} from '../../domain/repositories'
import { Ticker } from '../../domain/value-objects/Ticker'

interface IRequest {
  ticker: string
}

interface IResponse {
  transactions: Array<{
    type: 'IN' | 'OUT'
    id: string
    quantity: number
    value: number
    extraCosts: number
  }>
}

export class ListAllTransactionsForStockUseCase {
  private transactionsRepository: ITransactionsRepository

  private stocksRepository: IStocksRepository

  public constructor(
    transactionsRepository: ITransactionsRepository,
    stocksRepository: IStocksRepository,
  ) {
    this.transactionsRepository = transactionsRepository
    this.stocksRepository = stocksRepository
  }

  public async execute({ ticker }: IRequest): Promise<IResponse> {
    const stock = await this.stocksRepository.findByTicker(
      Ticker.create(ticker),
    )

    if (!stock) {
      return { transactions: [] }
    }

    await this.transactionsRepository.loadAllForStock(stock)

    return {
      transactions: stock.transactions.map(transaction => {
        const { id, quantity, type, value, extraCosts } = transaction

        return {
          type,
          id: id.value,
          quantity: quantity.value,
          value: value.value,
          extraCosts: extraCosts.value,
        }
      }),
    }
  }
}
