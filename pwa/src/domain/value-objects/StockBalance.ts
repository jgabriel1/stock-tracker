import { DomainValidationError } from '../errors/DomainValidationError'
import { Amount } from './Amount'
import { Quantity } from './Quantity'

interface IStockBalanceData {
  currentlyOwnedShares: number
  averageBoughtPrice: number
  totalInvested: number
}

export class StockBalance {
  public readonly currentlyOwnedShares: Quantity

  public readonly averageBoughtPrice: Amount

  public readonly totalInvested: Amount

  private constructor(
    currentlyOwnedShares: Quantity,
    averageBoughtPrice: Amount,
    totalInvested: Amount,
  ) {
    this.currentlyOwnedShares = currentlyOwnedShares
    this.averageBoughtPrice = averageBoughtPrice
    this.totalInvested = totalInvested
  }

  private isValid(): boolean {
    // TODO: It's possible that this will have business logic in the future.
    return true
  }

  public static create({
    currentlyOwnedShares,
    averageBoughtPrice,
    totalInvested,
  }: IStockBalanceData): StockBalance {
    const balanceObj = new StockBalance(
      Quantity.create(currentlyOwnedShares),
      Amount.create(averageBoughtPrice),
      Amount.create(totalInvested),
    )

    if (!balanceObj.isValid()) {
      throw new DomainValidationError(
        'Invalid balance: It is impossible to have this balance data.',
      )
    }

    return balanceObj
  }
}
