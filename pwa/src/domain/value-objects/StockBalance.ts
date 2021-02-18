import { Amount } from './Amount'
import { Quantity } from './Quantity'
import { UniqueIdentifier } from './UniqueIdentifier'

interface IStockBalanceData {
  stockId: string
  currentlyOwnedShares: number
  averageBoughtPrice: number
  totalInvested: number
}

export class StockBalance {
  private constructor(
    public readonly stockId: UniqueIdentifier,

    public readonly currentlyOwnedShares: Quantity,

    public readonly averageBoughtPrice: Amount,

    public readonly totalInvested: Amount,
  ) {}

  public static create({
    stockId,
    currentlyOwnedShares,
    averageBoughtPrice,
    totalInvested,
  }: IStockBalanceData): StockBalance {
    const balance = new StockBalance(
      UniqueIdentifier.create(stockId),
      Quantity.create(currentlyOwnedShares),
      Amount.create(averageBoughtPrice),
      Amount.create(totalInvested),
    )

    return balance
  }
}
