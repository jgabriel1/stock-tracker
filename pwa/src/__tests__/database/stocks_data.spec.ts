import * as path from 'path'
import { Connection, createConnection, Repository } from 'typeorm'

import { migrations } from '../../data/migrations'
import { StockInfoModel } from '../../data/entities/StockInfoModel'
import { TransactionModel } from '../../data/entities/TransactionModel'

describe('@Database: stocks data queries', () => {
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

    await connection.runMigrations()

    stockInfosRepository = connection.getRepository(StockInfoModel)
    transactionsRepository = connection.getRepository(TransactionModel)

    const [{ id: appleId }, { id: teslaId }] = await stockInfosRepository.save([
      stockInfosRepository.create({ ticker: 'AAPL', full_name: 'Apple Inc.' }),
      stockInfosRepository.create({ ticker: 'TSLA', full_name: 'Tesla Inc.' }),
    ])

    await transactionsRepository.save([
      {
        type: 'income',
        quantity: 10,
        value: 1000,
        extra_costs: 0,
        stock_id: appleId,
      },
      {
        type: 'income',
        quantity: 10,
        value: 1000,
        extra_costs: 0,
        stock_id: appleId,
      },
      {
        type: 'income',
        quantity: 10,
        value: 1000,
        extra_costs: 0,
        stock_id: appleId,
      },
      {
        type: 'outcome',
        quantity: 10,
        value: 1000,
        extra_costs: 0,
        stock_id: appleId,
      },
      {
        type: 'income',
        quantity: 10,
        value: 1000,
        extra_costs: 0,
        stock_id: teslaId,
      },
    ])
  })

  afterAll(async () => {
    await connection.dropDatabase()

    await connection.close()
  })

  it('should return the total stock information for all transactions', async () => {
    const result = await transactionsRepository.query(`
      SELECT
        ticker,
        full_name,
        total_invested,
        (total_invested / total_shares_bought) AS average_bought_price,
        (total_shares_bought - total_shares_sold) AS currently_owned_shares
      FROM
        (
          SELECT
            stock_id,
            SUM(
              CASE
                WHEN type = 'income' THEN value
                ELSE 0
              END
            ) AS total_invested,
            SUM(
              CASE
                WHEN type = 'income' THEN quantity
                ELSE 0
              END
            ) AS total_shares_bought,
            SUM(
              CASE
                WHEN type = 'outcome' THEN quantity
                ELSE 0
              END
            ) AS total_shares_sold
          FROM
            transactions
          GROUP BY
            stock_id
        ) AS stocks LEFT JOIN stock_infos ON stocks.stock_id = stock_infos.id;
    `)

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ticker: 'AAPL',
          average_bought_price: 100,
          currently_owned_shares: 20,
        }),
        expect.objectContaining({
          ticker: 'TSLA',
          average_bought_price: 100,
          currently_owned_shares: 10,
        }),
      ]),
    )
  })
})
