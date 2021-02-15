import { Amount } from '../value-objects/Amount'
import { Quantity } from '../value-objects/Quantity'
import {
  generateUniqueIdentifier,
  UniqueIdentifier,
} from '../value-objects/UniqueIdentifier'

interface ITransactionData {
  type: 'IN' | 'OUT'
  value: number
  quantity: number
  stock_id: string
  extra_costs?: number
}

export class Transaction {
  public readonly id: UniqueIdentifier

  public readonly type: 'IN' | 'OUT'

  public readonly value: Amount

  public readonly quantity: Quantity

  public readonly stock_id: UniqueIdentifier

  public readonly extra_costs: Amount

  private constructor(
    type: 'IN' | 'OUT',
    value: Amount,
    quantity: Quantity,
    stock_id: UniqueIdentifier,
    extra_costs: Amount,
  ) {
    this.type = type
    this.value = value
    this.quantity = quantity
    this.stock_id = stock_id
    this.extra_costs = extra_costs

    this.id = generateUniqueIdentifier()
  }

  public static create({
    type,
    value,
    quantity,
    stock_id,
    extra_costs,
  }: ITransactionData): Transaction {
    const valueObj = Amount.create(value)
    const quantityObj = Quantity.create(quantity)
    const stockIdObj = UniqueIdentifier.create(stock_id)
    const extraCostsObj = Amount.create(extra_costs || 0)

    const transaction = new Transaction(
      type,
      valueObj,
      quantityObj,
      stockIdObj,
      extraCostsObj,
    )

    return transaction
  }
}
