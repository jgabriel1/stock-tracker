import { StockInfo } from '../models/StockInfo'

export interface IStockSearchRepository {
  searchForName(name: string): Promise<StockInfo[]>
}
