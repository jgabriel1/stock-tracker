import { PriceInformation } from '../value-objects/PriceInformation'
import { Ticker } from '../value-objects/Ticker'

export interface IStockPriceInfoRepository {
  getCurrentPrice(tickers: Ticker[]): Promise<PriceInformation[]>
}
