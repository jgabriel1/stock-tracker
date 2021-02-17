import {
  IStockPriceInfoRepository,
  IStocksRepository,
} from '../../domain/repositories'

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

  public constructor(
    stocksRepository: IStocksRepository,
    stockPriceInfoRepository: IStockPriceInfoRepository,
  ) {
    this.stocksRepository = stocksRepository
    this.stockPriceInfoRepository = stockPriceInfoRepository
  }

  public async execute(): Promise<IResponse> {
    const stocks = await this.stocksRepository.findAllWithBalance()

    const stockPriceInfos = await this.stockPriceInfoRepository.getCurrentPrice(
      stocks.map(stock => stock.ticker),
    )

    return {
      stocks: stocks.map(stock => {
        const info = stockPriceInfos.find(
          _info => _info.ticker.value === stock.ticker.value,
        )

        const regularMarketPrice = info?.regularMarketPrice.value || 0
        const currentlyOwnedShares =
          stock.balance?.currentlyOwnedShares.value || 0
        const averageBoughtPrice =
          stock.balance?.currentlyOwnedShares.value || 0

        const totalInvested = currentlyOwnedShares * averageBoughtPrice

        const currentWorth = currentlyOwnedShares * regularMarketPrice

        return {
          ticker: stock.ticker.value,
          fullName: stock.fullName,
          averageBoughtPrice,
          regularMarketPrice,
          currentlyOwnedShares,
          totalInvested,
          currentWorth,
        }
      }),
    }
  }
}
