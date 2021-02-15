import { isInt } from 'class-validator'

import { DomainValidationError } from '../errors/DomainValidationError'

export class Quantity {
  public readonly value: number

  private constructor(quantity: number) {
    this.value = quantity

    Object.freeze(this)
  }

  private isValid(): boolean {
    return (
      // Quantity must be an integer
      isInt(this.value)
    )
  }

  public static create(quantity: number): Quantity {
    const quantityObject = new Quantity(quantity)

    if (!quantityObject.isValid()) {
      throw new DomainValidationError('Invalid stock quantity.')
    }

    return quantityObject
  }
}
