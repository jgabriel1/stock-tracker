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
  stockId: string
  extraCosts?: number
}

export class Transaction {
  public readonly id: UniqueIdentifier

  public readonly type: 'IN' | 'OUT'

  public readonly value: Amount

  public readonly quantity: Quantity

  public readonly stockId: UniqueIdentifier

  public readonly extraCosts: Amount

  private constructor(
    type: 'IN' | 'OUT',
    value: Amount,
    quantity: Quantity,
    stockId: UniqueIdentifier,
    extraCosts: Amount,
  ) {
    this.type = type
    this.value = value
    this.quantity = quantity
    this.stockId = stockId
    this.extraCosts = extraCosts

    this.id = generateUniqueIdentifier()
  }

  public static create({
    type,
    value,
    quantity,
    stockId,
    extraCosts,
  }: ITransactionData): Transaction {
    const valueObj = Amount.create(value)
    const quantityObj = Quantity.create(quantity)
    const stockIdObj = UniqueIdentifier.create(stockId)
    const extraCostsObj = Amount.create(extraCosts || 0)

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
