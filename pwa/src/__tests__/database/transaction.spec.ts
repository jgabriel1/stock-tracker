import * as path from 'path'
import { Connection, createConnection, Repository } from 'typeorm'

import { migrations } from '../../data/migrations'
import { StockInfoModel } from '../../data/entities/StockInfoModel'
import { TransactionModel } from '../../data/entities/TransactionModel'

describe('@Database: transaction table', () => {
  const pathToDatabase = path.resolve(__dirname, 'test_database.db')

  let connection: Connection
  let stockInfosRepository: Repository<StockInfoModel>
  let transactionsRepository: Repository<TransactionModel>

  beforeAll(async () => {
    connection = await createConnection({
      type: 'sqlite',
      database: pathToDatabase,
      migrations,
      entities: [StockInfoModel, TransactionModel],
      synchronize: false,
    })
  })

  beforeEach(async () => {
    await connection.runMigrations()

    stockInfosRepository = connection.getRepository(StockInfoModel)
    transactionsRepository = connection.getRepository(TransactionModel)
  })

  afterEach(async () => {
    await connection.dropDatabase()
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should be able to create a transaction', async () => {
    const stockInfo = stockInfosRepository.create({
      ticker: 'AAPL',
      full_name: 'Apple',
    })

    await stockInfosRepository.save(stockInfo)

    const transaction = transactionsRepository.create({
      quantity: 10,
      value: 1000.0,
      type: 'income',
      stock_id: stockInfo.id,
      extra_costs: 0.0,
    })

    await transactionsRepository.save(transaction)

    expect(transaction.id).not.toBe(undefined)
    expect(transaction.id).toEqual(1)

    const createdTransaction = await transactionsRepository.findOne({
      where: { id: transaction.id },
      relations: ['stock_info'],
    })

    expect(createdTransaction?.stock_info).toMatchObject(stockInfo)
  })
})
