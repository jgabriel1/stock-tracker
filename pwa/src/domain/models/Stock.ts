import { StockBalance } from '../value-objects/StockBalance'
import { PriceInformation } from '../value-objects/PriceInformation'
import { StockInfo } from './StockInfo'

export interface ICombinedStockData {
  ticker: string
  fullName: string
  averageBoughtPrice: number
  currentlyOwnedShares: number
  regularMarketPrice: number
  totalApplied: number
  currentWorth: number
}

export class Stock {
  private constructor(
    public info: StockInfo,

    public balance?: StockBalance,

    public priceData?: PriceInformation,
  ) {}

  public setBalance(balance: StockBalance): void {
    this.balance = balance
  }

  public setPriceData(priceData: PriceInformation): void {
    this.priceData = priceData
  }

  public calculateCombinedData(): ICombinedStockData {
    if (!this.balance || !this.priceData) {
      throw new Error(
        'Cannot calculate stock data. Both balance and priceData need to be set to stock object.',
      )
    }

    const { ticker, fullName } = this.info

    const { averageBoughtPrice, currentlyOwnedShares } = this.balance
    const { regularMarketPrice } = this.priceData

    const totalApplied = currentlyOwnedShares.value * averageBoughtPrice.value
    const currentWorth = currentlyOwnedShares.value * regularMarketPrice.value

    return {
      ticker: ticker.value,
      fullName,
      averageBoughtPrice: averageBoughtPrice.value,
      currentlyOwnedShares: currentlyOwnedShares.value,
      regularMarketPrice: regularMarketPrice.value,
      totalApplied,
      currentWorth,
    }
  }

  public static fromStockInfo(info: StockInfo): Stock {
    return new Stock(info)
  }
}
