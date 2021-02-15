import { v4 as uuid } from 'uuid'
import { isString, isUUID } from 'class-validator'

import { DomainValidationError } from '../errors/DomainValidationError'

export class UniqueIdentifier {
  public readonly value: string

  private constructor(value: string) {
    this.value = value

    Object.freeze(this)
  }

  private isValid(): boolean {
    return isString(this.value) && isUUID(this.value, '4')
  }

  public static create(id: string): UniqueIdentifier {
    const uniqueIdentifier = new UniqueIdentifier(id)

    if (!uniqueIdentifier.isValid()) {
      throw new DomainValidationError('Invalid unique identifier.')
    }

    return uniqueIdentifier
  }
}

export function generateUniqueIdentifier(): UniqueIdentifier {
  const id = uuid()

  return UniqueIdentifier.create(id)
}
