import { Connection, Repository } from 'typeorm'

import { TransactionModel } from '../entities/TransactionModel'

interface ICreateTransactionData {
  stock_id: number
  type: 'income' | 'outcome'
  value: number
  quantity: number
}

interface IStockData {
  ticker: string
  full_name: string
  total_invested: number
  average_bought_price: number
  currently_owned_shares: number
}

export class TransactionsRepository {
  private ormRepository: Repository<TransactionModel>

  constructor(connection: Connection) {
    this.ormRepository = connection.getRepository(TransactionModel)
  }

  public async create({
    stock_id,
    type,
    value,
    quantity,
  }: ICreateTransactionData): Promise<TransactionModel> {
    const transaction = this.ormRepository.create({
      stock_id,
      type,
      value,
      quantity,
      extra_costs: 0,
    })

    await this.ormRepository.save(transaction)

    return transaction
  }

  public async findAllByStockId(stock_id: number): Promise<TransactionModel[]> {
    const transactions = await this.ormRepository.find({
      where: { stock_id },
    })

    return transactions
  }

  public async updateExtraCosts(
    transactionId: number,
    extra_costs: number,
  ): Promise<void> {
    await this.ormRepository.update({ id: transactionId }, { extra_costs })
  }

  public async getTotalStocksData(): Promise<Map<string, IStockData>> {
    const stocksData: IStockData[] = await this.ormRepository.query(`
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

    return new Map(stocksData.map(data => [data.ticker, data]))
  }
}
