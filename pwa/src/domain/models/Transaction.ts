import { Amount } from '../value-objects/Amount'
import { Quantity } from '../value-objects/Quantity'
import {
  generateUniqueIdentifier,
  UniqueIdentifier,
} from '../value-objects/UniqueIdentifier'

export interface ITransactionData {
  id: string
  type: 'IN' | 'OUT'
  value: number
  quantity: number
  stockId: string
  extraCosts?: number
}

export class Transaction {
  private constructor(
    public readonly id: UniqueIdentifier,

    public readonly type: 'IN' | 'OUT',

    public readonly value: Amount,

    public readonly quantity: Quantity,

    public readonly stockId: UniqueIdentifier,

    public readonly extraCosts: Amount,
  ) {}

  public static create({
    type,
    value,
    quantity,
    stockId,
    extraCosts,
  }: Omit<ITransactionData, 'id'>): Transaction {
    const id = generateUniqueIdentifier()

    const transaction = new Transaction(
      id,
      type,
      Amount.create(value),
      Quantity.create(quantity),
      UniqueIdentifier.create(stockId),
      Amount.create(extraCosts || 0),
    )

    return transaction
  }

  public static parse({
    id,
    type,
    value,
    quantity,
    stockId,
    extraCosts,
  }: ITransactionData): Transaction {
    const transaction = new Transaction(
      UniqueIdentifier.create(id),
      type,
      Amount.create(value),
      Quantity.create(quantity),
      UniqueIdentifier.create(stockId),
      Amount.create(extraCosts || 0),
    )

    return transaction
  }
}
