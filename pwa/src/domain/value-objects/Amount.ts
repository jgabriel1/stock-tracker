import { isNumber, isPositive } from 'class-validator'

import { DomainValidationError } from '../errors/DomainValidationError'

export class Amount {
  public readonly value: number

  private constructor(value: number) {
    this.value = value

    Object.freeze(this)
  }

  private isValid(): boolean {
    return (
      // Must be a numeric value
      isNumber(this.value) &&
      // Must be positive always
      isPositive(this.value)
    )
  }

  public static create(amount: number): Amount {
    const amountObject = new Amount(amount)

    if (!amountObject.isValid()) {
      throw new DomainValidationError(
        'Invalid amount: Amount must always be positive.',
      )
    }

    return amountObject
  }
}
