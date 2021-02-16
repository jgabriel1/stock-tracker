import { StockInfo } from '../value-objects/StockInfo'

// For the sake of simplification, only stocks from the SAO market will be considered
// in the application. Otherwise, things like currency and the market itself would
// have to be taken into consideration.
export class AllowedMarketSpecification {
  private readonly allowedMarkets: string[]

  public constructor(allowedMarkets: string[] = ['SAO']) {
    this.allowedMarkets = allowedMarkets
  }

  public isSatisfiedBy(info: StockInfo): boolean {
    return this.allowedMarkets.includes(info.market)
  }
}
