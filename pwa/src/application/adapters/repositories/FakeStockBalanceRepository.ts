import { IStockBalanceRepository } from '../../../domain/repositories'
import { StockBalance } from '../../../domain/value-objects/StockBalance'
import { UniqueIdentifier } from '../../../domain/value-objects/UniqueIdentifier'

export class FakeStockBalanceRepository implements IStockBalanceRepository {
  private balances: StockBalance[]

  public constructor() {
    this.balances = []
  }

  public async findAllBalances(): Promise<StockBalance[]> {
    return this.balances
  }

  public async findBalanceForStockId(
    stockId: UniqueIdentifier,
  ): Promise<StockBalance | null> {
    const balance = this.balances.find(b => b.stockId.value === stockId.value)

    return balance || null
  }
}
