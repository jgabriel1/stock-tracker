import { StockInfo } from '../../../domain/models/StockInfo'
import { IStockInfoRepository } from '../../../domain/repositories'
import { Ticker } from '../../../domain/value-objects/Ticker'

export class FakeStockInfoRepository implements IStockInfoRepository {
  private stockInfos: StockInfo[]

  public constructor() {
    this.stockInfos = []
  }

  public async save(stockInfo: StockInfo): Promise<void> {
    this.stockInfos.push(stockInfo)
  }

  public async findAllStocks(): Promise<StockInfo[]> {
    return this.stockInfos
  }

  public async findStockByTicker(ticker: Ticker): Promise<StockInfo | null> {
    const stockInfo = this.stockInfos.find(s => s.ticker.value === ticker.value)

    return stockInfo || null
  }
}
