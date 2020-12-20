import * as path from 'path'
import {
  Connection,
  createConnection,
  QueryFailedError,
  Repository,
} from 'typeorm'

import { migrations } from '../../src/data/migrations'
import { StockInfoModel } from '../../src/data/entities/StockInfoModel'
import { TransactionModel } from '../../src/data/entities/TransactionModel'

describe('@Database: Create stock info', () => {
  const pathToDatabase = path.resolve(__dirname, 'test_database.db')

  let connection: Connection
  let stockInfosRepository: Repository<StockInfoModel>

  beforeAll(async () => {
    connection = await createConnection({
      type: 'sqlite',
      database: pathToDatabase,
      migrations,
      entities: [StockInfoModel, TransactionModel],
    })
  })

  beforeEach(async () => {
    await connection.runMigrations()

    stockInfosRepository = connection.getRepository(StockInfoModel)
  })

  afterEach(async () => {
    await connection.dropDatabase()
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should be able to create a stock info record', async () => {
    const stockInfo = stockInfosRepository.create({
      ticker: 'AAPL',
      full_name: 'Apple Inc.',
    })

    await stockInfosRepository.save(stockInfo)

    expect(stockInfo.id).toBeTruthy()

    const storedStockInfo = await stockInfosRepository.findOne(stockInfo.id)

    expect(storedStockInfo).toBeTruthy()
  })

  it('should not be able to create a stock info with the same ticker', async () => {
    const firstCreation = stockInfosRepository.create({
      ticker: 'AAPL',
      full_name: 'Apple Inc.',
    })

    await stockInfosRepository.save(firstCreation)

    const secondCreation = stockInfosRepository.create({
      ticker: 'AAPL',
      full_name: 'whatever',
    })

    await expect(
      stockInfosRepository.save(secondCreation),
    ).rejects.toBeInstanceOf(QueryFailedError)
  })
})
