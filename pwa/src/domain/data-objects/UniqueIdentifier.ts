import { v4 as uuid } from 'uuid'

export class UniqueIdentifier {
  public readonly value: string

  public constructor(value: string) {
    this.value = value
  }

  public static generateNew(): UniqueIdentifier {
    const id = uuid()

    return new UniqueIdentifier(id)
  }
}
