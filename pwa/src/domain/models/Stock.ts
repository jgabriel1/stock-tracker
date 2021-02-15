import { Transaction } from './Transaction'
import { Ticker } from '../value-objects/Ticker'
import { StockBalance } from '../value-objects/StockBalance'
import {
  generateUniqueIdentifier,
  UniqueIdentifier,
} from '../value-objects/UniqueIdentifier'

interface IStockData {
  ticker: string
  full_name: string
}

export class Stock {
  public readonly id: UniqueIdentifier

  public readonly ticker: Ticker

  public readonly full_name: string

  public balance?: StockBalance

  public transactions: Transaction[]

  private constructor(ticker: Ticker, full_name: string) {
    this.ticker = ticker
    this.full_name = full_name

    this.id = generateUniqueIdentifier()
    this.transactions = []
  }

  public setBalance(balance: StockBalance): void {
    this.balance = balance
  }

  public setTransactions(transactions: Transaction[]): void {
    this.transactions = transactions
  }

  public static create({ ticker, full_name }: IStockData): Stock {
    const tickerObj = Ticker.create(ticker)

    const stock = new Stock(tickerObj, full_name)

    return stock
  }
}
