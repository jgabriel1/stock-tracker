import { Stock } from '../models/Stock'
import { PriceInformation } from '../value-objects/PriceInformation'
import { StockBalance } from '../value-objects/StockBalance'

interface ICombinedStockData {
  ticker: string
  fullName: string
  averageBoughtPrice: number
  regularMarketPrice: number
  currentlyOwnedShares: number
  totalInvested: number
  currentWorth: number
}

export class CombinedStockDataCalculatorService {
  public calculate(
    stock: Stock,
    information: PriceInformation,
  ): ICombinedStockData {
    if (stock.ticker.value !== information.ticker.value) {
      throw new Error("Price information and stock tickers don't match")
    }

    const balance = stock.balance as StockBalance

    const averageBoughtPrice = balance.averageBoughtPrice.value
    const currentlyOwnedShares = balance.currentlyOwnedShares.value

    const regularMarketPrice = information.regularMarketPrice.value

    const totalInvested = averageBoughtPrice * currentlyOwnedShares
    const currentWorth = regularMarketPrice * currentlyOwnedShares

    return {
      ticker: stock.ticker.value,
      fullName: stock.fullName,
      averageBoughtPrice,
      regularMarketPrice,
      currentlyOwnedShares,
      totalInvested,
      currentWorth,
    }
  }
}
