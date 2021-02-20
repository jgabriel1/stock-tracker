import { StockInfo } from '../../domain/models/StockInfo'
import { StockBalance } from '../../domain/value-objects/StockBalance'
import { Ticker } from '../../domain/value-objects/Ticker'
import { UniqueIdentifier } from '../../domain/value-objects/UniqueIdentifier'
import {
  IStockInfoRepository,
  ITransactionsRepository,
  IStockBalanceRepository,
} from '../../domain/repositories'
import {
  FakeStockBalanceRepository,
  FakeStockInfoRepository,
  FakeTransactionsRepository,
} from '../adapters/repositories'
import { CreateNewTransactionUseCase } from './CreateNewTransactionUseCase'
import { InvalidTransactionError } from '../../domain/errors/InvalidTransactionError'

describe('CreateNewTransactionUseCase', () => {
  let transactionsRepository: ITransactionsRepository
  let stockInfoRepository: IStockInfoRepository
  let stockBalanceRepository: IStockBalanceRepository

  let createNewTransaction: CreateNewTransactionUseCase

  beforeEach(() => {
    transactionsRepository = new FakeTransactionsRepository()
    stockInfoRepository = new FakeStockInfoRepository()
    stockBalanceRepository = new FakeStockBalanceRepository()

    createNewTransaction = new CreateNewTransactionUseCase(
      stockInfoRepository,
      transactionsRepository,
      stockBalanceRepository,
    )
  })

  it('should create a new stock and then create the transaction in case a stock does not exist', async () => {
    jest.spyOn(stockInfoRepository, 'findStockByTicker')
    jest.spyOn(stockInfoRepository, 'save')
    jest.spyOn(transactionsRepository, 'save')

    await createNewTransaction.execute({
      type: 'IN',
      value: 1000.0,
      quantity: 10,
      stockInfo: {
        ticker: 'AAPL',
        fullName: 'Apple Inc.',
        market: 'SAO',
      },
    })

    expect(stockInfoRepository.findStockByTicker).toHaveBeenCalled()
    expect(stockInfoRepository.save).toHaveBeenCalled()
    expect(transactionsRepository.save).toHaveBeenCalled()
  })

  it('should not create a new stock in case the stock already exists', async () => {
    async function setUp() {
      const stockInfo = StockInfo.create({
        ticker: 'AAPL',
        fullName: 'Apple Inc.',
        market: 'SAO',
      })

      await stockInfoRepository.save(stockInfo)
    }

    await setUp()

    // Create spy only after the info has been created...
    jest.spyOn(stockInfoRepository, 'findStockByTicker')
    jest.spyOn(stockInfoRepository, 'save')
    jest.spyOn(transactionsRepository, 'save')

    await createNewTransaction.execute({
      type: 'IN',
      value: 1000.0,
      quantity: 10,
      stockInfo: {
        ticker: 'AAPL',
        fullName: 'Apple Inc.',
        market: 'SAO',
      },
    })

    expect(stockInfoRepository.findStockByTicker).toHaveBeenCalled()
    expect(stockInfoRepository.save).not.toHaveBeenCalled()
    expect(transactionsRepository.save).toHaveBeenCalled()
  })

  it('should throw an error if the balance is not enough for creating outcome transaction', async () => {
    async function setUp() {
      const stockInfo = StockInfo.create({
        ticker: 'AAPL',
        fullName: 'Apple Inc.',
        market: 'SAO',
      })

      const stockBalance = StockBalance.create({
        stockId: stockInfo.id.value,
        averageBoughtPrice: 100,
        currentlyOwnedShares: 10,
        totalInvested: 10000,
      })

      stockInfoRepository.findStockByTicker = jest.fn(
        async (_: Ticker) => stockInfo,
      )

      stockBalanceRepository.findBalanceForStockId = jest.fn(
        async (_: UniqueIdentifier) => stockBalance,
      )

      jest.spyOn(transactionsRepository, 'save')
    }

    await setUp()

    await expect(
      createNewTransaction.execute({
        type: 'OUT',
        value: 2000.0,
        quantity: 20,
        stockInfo: {
          ticker: 'AAPL',
          fullName: 'Apple Inc.',
          market: 'SAO',
        },
      }),
    ).rejects.toBeInstanceOf(InvalidTransactionError)

    expect(transactionsRepository.save).not.toHaveBeenCalled()
  })

  it('should create outcome transaction normally in case there is enough balance', async () => {
    async function setUp() {
      const stockInfo = StockInfo.create({
        ticker: 'AAPL',
        fullName: 'Apple Inc.',
        market: 'SAO',
      })

      const stockBalance = StockBalance.create({
        stockId: stockInfo.id.value,
        averageBoughtPrice: 100,
        currentlyOwnedShares: 20,
        totalInvested: 20000,
      })

      stockInfoRepository.findStockByTicker = jest.fn(
        async (_: Ticker) => stockInfo,
      )

      stockBalanceRepository.findBalanceForStockId = jest.fn(
        async (_: UniqueIdentifier) => stockBalance,
      )

      jest.spyOn(transactionsRepository, 'save')
    }

    await setUp()

    await createNewTransaction.execute({
      type: 'OUT',
      value: 2000.0,
      quantity: 20,
      stockInfo: {
        ticker: 'AAPL',
        fullName: 'Apple Inc.',
        market: 'SAO',
      },
    })

    expect(transactionsRepository.save).toHaveBeenCalled()
  })
})
