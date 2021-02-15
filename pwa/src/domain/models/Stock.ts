import { Ticker } from '../value-objects/Ticker'
import {
  generateUniqueIdentifier,
  UniqueIdentifier,
} from '../value-objects/UniqueIdentifier'
import { Transaction } from './Transaction'

interface IStockData {
  ticker: string
  full_name: string
}

export class Stock {
  public readonly id: UniqueIdentifier

  public readonly ticker: Ticker

  public readonly full_name: string

  public transactions: Transaction[]

  private constructor(ticker: Ticker, full_name: string) {
    this.ticker = ticker
    this.full_name = full_name

    this.id = generateUniqueIdentifier()
    this.transactions = []
  }

  public static create({ ticker, full_name }: IStockData): Stock {
    const tickerObj = Ticker.create(ticker)

    const stock = new Stock(tickerObj, full_name)

    return stock
  }
}
