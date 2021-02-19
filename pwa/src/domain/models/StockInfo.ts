import { Ticker } from '../value-objects/Ticker'
import {
  generateUniqueIdentifier,
  UniqueIdentifier,
} from '../value-objects/UniqueIdentifier'

interface IStockInfoData {
  id: string
  ticker: string
  fullName: string
  market: string
}

export class StockInfo {
  private constructor(
    public readonly id: UniqueIdentifier,

    public readonly ticker: Ticker,

    public readonly fullName: string,

    public readonly market: string,
  ) {}

  public static create({
    ticker,
    fullName,
    market,
  }: Omit<IStockInfoData, 'id'>): StockInfo {
    const id = generateUniqueIdentifier()

    const stockInfo = new StockInfo(id, Ticker.create(ticker), fullName, market)

    return stockInfo
  }

  public static parse({
    id,
    ticker,
    fullName,
    market,
  }: IStockInfoData): StockInfo {
    const stockInfo = new StockInfo(
      UniqueIdentifier.create(id),
      Ticker.create(ticker),
      fullName,
      market,
    )

    return stockInfo
  }
}
