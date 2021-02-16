import { Ticker } from './Ticker'

interface IStockNameData {
  ticker: string
  full_name: string
}

export class StockNameData {
  // TODO: maybe this will become part of the stock entity

  public readonly full_name: string

  public readonly ticker: Ticker

  private constructor(ticker: Ticker, full_name: string) {
    this.ticker = ticker
    this.full_name = full_name
  }

  public static create({ ticker, full_name }: IStockNameData): StockNameData {
    const stockNameData = new StockNameData(Ticker.create(ticker), full_name)

    return stockNameData
  }
}
