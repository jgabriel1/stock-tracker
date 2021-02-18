import { StockBalance } from '../value-objects/StockBalance'
import { UniqueIdentifier } from '../value-objects/UniqueIdentifier'

export interface IStockBalanceRepository {
  findAllBalances(): Promise<StockBalance[]>
  findBalanceForStockId(stockId: UniqueIdentifier): Promise<StockBalance | null>
}
