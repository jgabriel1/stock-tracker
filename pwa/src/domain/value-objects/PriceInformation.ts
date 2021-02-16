import { Amount } from './Amount'
import { Ticker } from './Ticker'

interface IPriceInformationData {
  ticker: string
  regularMarketPrice: number
}

export class PriceInformation {
  public readonly ticker: Ticker

  public readonly regularMarketPrice: Amount

  private constructor(ticker: Ticker, regularMarketPrice: Amount) {
    this.ticker = ticker
    this.regularMarketPrice = regularMarketPrice
  }

  public static create({
    ticker,
    regularMarketPrice,
  }: IPriceInformationData): PriceInformation {
    const priceInformation = new PriceInformation(
      Ticker.create(ticker),
      Amount.create(regularMarketPrice),
    )

    return priceInformation
  }
}
