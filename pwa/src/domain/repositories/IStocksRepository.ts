import { Stock } from '../models/Stock'
import { Ticker } from '../value-objects/Ticker'
import { UniqueIdentifier } from '../value-objects/UniqueIdentifier'

export interface IStocksRepository {
  save(stock: Stock): Promise<void>
  loadBalance(stock: Stock): Promise<void>
  findByTicker(ticker: Ticker): Promise<Stock | null>
  delete(stockId: UniqueIdentifier): Promise<void>
}
