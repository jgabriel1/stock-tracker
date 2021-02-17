import { Stock } from '../../domain/models/Stock'
import { Transaction } from '../../domain/models/Transaction'
import {
  IStocksRepository,
  ITransactionsRepository,
} from '../../domain/repositories'
import { StockBalance } from '../../domain/value-objects/StockBalance'
import { CreateNewTransactionUseCase } from './CreateNewTransactionUseCase'

describe('CreateNewTransactionUseCase', () => {
  let transactionsRepository: ITransactionsRepository
  let stocksRepository: IStocksRepository

  beforeEach(() => {
    transactionsRepository = {
      save: jest.fn(async (_: Transaction) => undefined),
      findOne: jest.fn(async () => null),
      delete: jest.fn(async () => undefined),
      loadAllForStock: jest.fn(async () => undefined),
    }

    stocksRepository = {
      save: jest.fn(async (_: Stock) => undefined),
      findByTicker: jest.fn(async () => null),
      delete: jest.fn(async () => undefined),
      loadBalance: jest.fn(async (_: Stock) => undefined),
    }
  })

  it('should create a new stock and then create the transaction in case a stock does not exist (mocked)', async () => {
    const createNewTransaction = new CreateNewTransactionUseCase(
      transactionsRepository,
      stocksRepository,
    )

    await createNewTransaction.execute({
      type: 'IN',
      value: 1000.0,
      quantity: 10,
      stockInfo: {
        ticker: 'AAPL',
        fullName: 'Apple Inc.',
      },
    })

    expect(stocksRepository.findByTicker).toHaveBeenCalled()
    expect(stocksRepository.save).toHaveBeenCalled()
    expect(transactionsRepository.save).toHaveBeenCalled()
  })

  it('should not create a new stock in case the stock already exists (mocked)', async () => {
    // Mock stocks repository to always return a stock:
    stocksRepository.findByTicker = jest.fn(async () =>
      Stock.create({
        ticker: 'AAPL',
        fullName: 'Apple Inc.',
      }),
    )

    const createNewTransaction = new CreateNewTransactionUseCase(
      transactionsRepository,
      stocksRepository,
    )

    await createNewTransaction.execute({
      type: 'IN',
      value: 1000.0,
      quantity: 10,
      stockInfo: {
        ticker: 'AAPL',
        fullName: 'Apple Inc.',
      },
    })

    expect(stocksRepository.findByTicker).toHaveBeenCalled()
    expect(stocksRepository.save).not.toHaveBeenCalled()
    expect(transactionsRepository.save).toHaveBeenCalled()
  })

  it('should throw an error if the balance is not enough for creating outcome transaction (mocked)', async () => {
    stocksRepository.loadBalance = jest.fn(async (stock: Stock) => {
      stock.setBalance(
        StockBalance.create({
          totalInvested: 10000,
          averageBoughtPrice: 100,
          currentlyOwnedShares: 10,
        }),
      )
    })

    const createNewTransaction = new CreateNewTransactionUseCase(
      transactionsRepository,
      stocksRepository,
    )

    await expect(
      createNewTransaction.execute({
        type: 'OUT',
        value: 2000.0,
        quantity: 20,
        stockInfo: {
          ticker: 'AAPL',
          fullName: 'Apple Inc.',
        },
      }),
    ).rejects.toThrow()

    expect(transactionsRepository.save).not.toHaveBeenCalled()
  })

  it('should create outcome transaction normally in case there is enough balance (mocked)', async () => {
    stocksRepository.loadBalance = jest.fn(async (stock: Stock) => {
      stock.setBalance(
        StockBalance.create({
          totalInvested: 10000,
          averageBoughtPrice: 100,
          currentlyOwnedShares: 10,
        }),
      )
    })

    const createNewTransaction = new CreateNewTransactionUseCase(
      transactionsRepository,
      stocksRepository,
    )

    await createNewTransaction.execute({
      type: 'OUT',
      value: 1000.0,
      quantity: 10,
      stockInfo: {
        ticker: 'AAPL',
        fullName: 'Apple Inc.',
      },
    })

    expect(transactionsRepository.save).toHaveBeenCalled()
  })
})
