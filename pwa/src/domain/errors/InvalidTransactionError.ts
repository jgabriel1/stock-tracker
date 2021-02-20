export class InvalidTransactionError {
  public readonly message: string

  public constructor(message: string) {
    this.message = message
  }
}
