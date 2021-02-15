import { DomainValidationError } from '../errors/DomainValidationError'
import { Amount } from './Amount'
import { Quantity } from './Quantity'

interface IStockBalanceData {
  currently_owned_shares: number
  average_bought_price: number
  total_invested: number
}

export class StockBalance {
  public readonly currently_owned_shares: Quantity

  public readonly average_bought_price: Amount

  public readonly total_invested: Amount

  private constructor(
    currently_owned_shares: Quantity,
    average_bought_price: Amount,
    total_invested: Amount,
  ) {
    this.currently_owned_shares = currently_owned_shares
    this.average_bought_price = average_bought_price
    this.total_invested = total_invested
  }

  private isValid(): boolean {
    // TODO: It's possible that this will have business logic in the future.
    return true
  }

  public static create({
    currently_owned_shares,
    average_bought_price,
    total_invested,
  }: IStockBalanceData): StockBalance {
    const balanceObj = new StockBalance(
      Quantity.create(currently_owned_shares),
      Amount.create(average_bought_price),
      Amount.create(total_invested),
    )

    if (!balanceObj.isValid()) {
      throw new DomainValidationError(
        'Invalid balance: It is impossible to have this balance data.',
      )
    }

    return balanceObj
  }
}
