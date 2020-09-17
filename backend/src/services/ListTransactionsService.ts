import { inject, injectable } from 'tsyringe'
import { HttpException } from '../errors/HttpException'
import { IStockInfo } from '../models/StockInfo'
import { ITransaction } from '../models/Transaction'
import { StockInfoRepository } from '../repositories/StockInfoRepository'
import { TransactionsRepository } from '../repositories/TransactionsRepository'

interface Request {
  userId: string
  ticker?: string
  from?: string
  to?: string
}

interface Response {
  transactions: ITransaction[]
}

@injectable()
export class ListTransactionsService {
  constructor(
    @inject(TransactionsRepository)
    private transactionsRepository: TransactionsRepository,
    @inject(StockInfoRepository)
    private stockInfoRepository: StockInfoRepository,
  ) { }

  private async getStockInfo(ticker: string): Promise<IStockInfo> {
    const stockInfo = await this.stockInfoRepository.findByTicker(ticker)

    if (!stockInfo) {
      throw new HttpException('That ticker does not exist.')
    }

    return stockInfo
  }

  public async execute({
    userId,
    ticker,
    from,
    to,
  }: Request): Promise<Response> {
    const parsedFrom = from ? new Date(from) : undefined
    const parsedTo = to ? new Date(to) : undefined

    if (!ticker) {
      throw new HttpException('Ticker is missing.')
    }

    const { _id: tickerId } = await this.getStockInfo(ticker)

    const transactions = await this.transactionsRepository.findByStockId({
      userId,
      tickerId: tickerId.toHexString(),
      from: parsedFrom,
      to: parsedTo,
    })

    return { transactions }
  }
}
