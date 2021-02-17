import { Stock } from '../../domain/models/Stock'
import {
  IStockPriceInfoRepository,
  IStocksRepository,
} from '../../domain/repositories'
import { PriceInformation } from '../../domain/value-objects/PriceInformation'
import { StockBalance } from '../../domain/value-objects/StockBalance'
import { LoadAllStocksWithBalanceUseCase } from './LoadAllStocksWithBalanceUseCase'

describe('LoadAllStocksWithBalanceUseCase', () => {
  let stocksRepository: IStocksRepository
  let stockPriceInfoRepository: IStockPriceInfoRepository

  beforeEach(() => {
    stocksRepository = {
      save: jest.fn(async (_: Stock) => undefined),
      findByTicker: jest.fn(async () => null),
      loadBalance: jest.fn(async (_: Stock) => undefined),
      findAllWithBalance: jest.fn(async () => {
        const stocks = [
          Stock.create({
            ticker: 'AAPL',
            fullName: 'Apple Inc.',
          }),
        ]
        const balances = [
          StockBalance.create({
            averageBoughtPrice: 100.0,
            currentlyOwnedShares: 100,
            totalInvested: 10000,
          }),
        ]

        stocks.forEach((stock, i) => {
          stock.setBalance(balances[i])
        })

        return stocks
      }),
    }

    stockPriceInfoRepository = {
      getCurrentPrice: jest.fn(async () => [
        PriceInformation.create({
          ticker: 'AAPL',
          regularMarketPrice: 120,
        }),
      ]),
    }
  })

  it('should return a list of stocks with their price information and the combined info', async () => {
    const loadAllStocksWithBalance = new LoadAllStocksWithBalanceUseCase(
      stocksRepository,
      stockPriceInfoRepository,
    )

    const { stocks } = await loadAllStocksWithBalance.execute()

    expect(stocksRepository.findAllWithBalance).toHaveBeenCalled()
    expect(stockPriceInfoRepository.getCurrentPrice).toHaveBeenCalled()

    expect(stocks).toBeInstanceOf(Array)

    const apple = stocks[0]

    expect(apple.ticker).toEqual('AAPL')

    expect(apple.averageBoughtPrice).toEqual(100)
    expect(apple.currentlyOwnedShares).toEqual(100)
    expect(apple.regularMarketPrice).toEqual(120)

    expect(apple.totalInvested).toEqual(10000)
    expect(apple.currentWorth).toEqual(12000)
  })
})
