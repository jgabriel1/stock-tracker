import { Stock } from '../models/Stock'
import { Ticker } from '../value-objects/Ticker'

export interface IStocksRepository {
  save(stock: Stock): Promise<void>
  loadBalance(stock: Stock): Promise<void>
  findByTicker(ticker: Ticker): Promise<Stock | null>
  findAllWithBalance(): Promise<Stock[]>
}
