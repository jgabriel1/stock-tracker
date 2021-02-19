import { StockInfo } from '../models/StockInfo'
import { Ticker } from '../value-objects/Ticker'

export interface IStockInfoRepository {
  save(stockInfo: StockInfo): Promise<void>
  findAllStocks(): Promise<StockInfo[]>
  findStockByTicker(ticker: Ticker): Promise<StockInfo | null>
}
