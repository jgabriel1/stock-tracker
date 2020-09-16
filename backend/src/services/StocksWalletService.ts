import { inject, injectable } from 'tsyringe'
import { TransactionsRepository } from '../repositories/TransactionsRepository'

interface Request {
  userId: string
}

interface Response {
  stocks: {
    [ticker: string]: {
      stockId: string
      ticker: string
      fullName: string
      totalInvested: number
      currentlyOwnedShares: number
      averageBoughtPrice: number
    }
  }
}

@injectable()
export class StocksWalletService {
  constructor(
    @inject(TransactionsRepository)
    private transactionsRepository: TransactionsRepository,
  ) { }

  public async execute({ userId }: Request): Promise<Response> {
    const stocksArray = await this.transactionsRepository.getStocksWallet(
      userId,
    )

    const stocks = {}

    stocksArray.forEach(stock => {
      Object.assign(stocks, { [stock.ticker]: stock })
    })

    return { stocks }
  }
}
