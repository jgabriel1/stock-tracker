import { isIn, isInstance, isInt } from 'class-validator'

import { UniqueIdentifier } from '../data-objects/UniqueIdentifier'
import { DomainValidationError } from '../errors/DomainValidationError'

interface ITransactionData {
  type: 'IN' | 'OUT'
  value: number
  quantity: number
  extra_costs: number
  stock_id: UniqueIdentifier
}

export class Transaction {
  public readonly id: UniqueIdentifier

  public readonly type: 'IN' | 'OUT'

  public readonly value: number

  public readonly quantity: number

  public readonly extra_costs: number

  public readonly stock_id: UniqueIdentifier

  public constructor({
    type,
    value,
    quantity,
    extra_costs,
    stock_id,
  }: ITransactionData) {
    this.type = type
    this.value = value
    this.quantity = quantity
    this.extra_costs = extra_costs
    this.stock_id = stock_id

    if (!this.isValid()) {
      throw new DomainValidationError('Validation error.')
    }

    this.id = UniqueIdentifier.generateNew()
  }

  private isValid(): boolean {
    return (
      // Transaction type must be either IN or OUT
      isIn(this.type, ['IN', 'OUT']) &&
      // Quantity must be an integer value
      isInt(this.quantity) &&
      // The stock id should use the unique identifier data object
      isInstance(this.stock_id, UniqueIdentifier)
    )
  }
}
