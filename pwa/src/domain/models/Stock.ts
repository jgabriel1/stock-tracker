import { Transaction } from './Transaction'
import { Ticker } from '../value-objects/Ticker'
import { StockBalance } from '../value-objects/StockBalance'
import {
  generateUniqueIdentifier,
  UniqueIdentifier,
} from '../value-objects/UniqueIdentifier'
import { PriceInformation } from '../value-objects/PriceInformation'

interface IStockData {
  ticker: string
  fullName: string
}

export class Stock {
  public readonly id: UniqueIdentifier

  public readonly ticker: Ticker

  public readonly fullName: string

  public balance?: StockBalance

  public priceInfo?: PriceInformation

  public transactions: Transaction[]

  private constructor(ticker: Ticker, fullName: string) {
    this.ticker = ticker
    this.fullName = fullName

    this.id = generateUniqueIdentifier()
    this.transactions = []
  }

  public setBalance(balance: StockBalance): void {
    this.balance = balance
  }

  public setPriceInformation(priceInfo: PriceInformation): void {
    this.priceInfo = priceInfo
  }

  public setTransactions(transactions: Transaction[]): void {
    this.transactions = transactions
  }

  public static create({ ticker, fullName }: IStockData): Stock {
    const tickerObj = Ticker.create(ticker)

    const stock = new Stock(tickerObj, fullName)

    return stock
  }
}
