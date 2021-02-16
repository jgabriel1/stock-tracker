import { StockNameData } from '../value-objects/StockNameData'

export interface IStockNameSearchRepository {
  searchForName(name: string): Promise<StockNameData[]>
}
