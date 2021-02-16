import { isUppercase } from 'class-validator'
import { DomainValidationError } from '../errors/DomainValidationError'
import { Ticker } from './Ticker'

interface IStockInfo {
  ticker: string
  fullName: string
  market: string
}

export class StockInfo {
  public readonly ticker: Ticker

  public readonly fullName: string

  public readonly market: string

  private constructor(ticker: Ticker, fullName: string, market: string) {
    this.ticker = ticker
    this.fullName = fullName
    this.market = market
  }

  private isValid(): boolean {
    return isUppercase(this.market)
  }

  public static create({ ticker, fullName, market }: IStockInfo): StockInfo {
    const stockInfo = new StockInfo(Ticker.create(ticker), fullName, market)

    if (!stockInfo.isValid()) {
      throw new DomainValidationError('Invalid stock info.')
    }

    return stockInfo
  }
}
