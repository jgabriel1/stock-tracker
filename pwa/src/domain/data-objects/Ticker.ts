export class Ticker {
  public readonly value

  public constructor(ticker: string) {
    this.value = ticker.toUpperCase()
  }
}
