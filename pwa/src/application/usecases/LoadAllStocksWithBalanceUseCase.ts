import {
  IStockPriceInfoRepository,
  IStocksRepository,
} from '../../domain/repositories'
import { CombinedStockDataCalculatorService } from '../../domain/services/CombinedStockDataCalculatorService'

interface IResponse {
  stocks: Array<{
    ticker: string
    fullName: string
    averageBoughtPrice: number
    regularMarketPrice: number
    currentlyOwnedShares: number
    totalInvested: number
    currentWorth: number
  }>
}

export class LoadAllStocksWithBalanceUseCase {
  private stocksRepository: IStocksRepository

  private stockPriceInfoRepository: IStockPriceInfoRepository

  private combinedStockDataCalculator: CombinedStockDataCalculatorService

  public constructor(
    stocksRepository: IStocksRepository,
    stockPriceInfoRepository: IStockPriceInfoRepository,
  ) {
    this.stocksRepository = stocksRepository
    this.stockPriceInfoRepository = stockPriceInfoRepository
    this.combinedStockDataCalculator = new CombinedStockDataCalculatorService()
  }

  public async execute(): Promise<IResponse> {
    const stocks = await this.stocksRepository.findAllWithBalance()

    const stockPriceInfos = await this.stockPriceInfoRepository.getCurrentPrice(
      stocks.map(stock => stock.ticker),
    )

    return {
      stocks: stocks.map((stock, i) => {
        const info = stockPriceInfos[i]

        return this.combinedStockDataCalculator.calculate(stock, info)
      }),
    }
  }
}
