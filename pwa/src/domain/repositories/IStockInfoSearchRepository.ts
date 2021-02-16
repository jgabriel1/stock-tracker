import { StockInfo } from '../value-objects/StockInfo'

export interface IStockInfoSearchRepository {
  searchForName(name: string): Promise<StockInfo[]>
}
