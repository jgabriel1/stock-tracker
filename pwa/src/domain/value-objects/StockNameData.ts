import { Ticker } from './Ticker'

interface IStockNameData {
  ticker: string
  fullName: string
}

export class StockNameData {
  // TODO: maybe this will become part of the stock entity

  public readonly fullName: string

  public readonly ticker: Ticker

  private constructor(ticker: Ticker, fullName: string) {
    this.ticker = ticker
    this.fullName = fullName
  }

  public static create({ ticker, fullName }: IStockNameData): StockNameData {
    const stockNameData = new StockNameData(Ticker.create(ticker), fullName)

    return stockNameData
  }
}
