import { InvalidTransactionError } from '../errors/InvalidTransactionError'
import { IStockInfoData, StockInfo } from '../models/StockInfo'
import { ITransactionData, Transaction } from '../models/Transaction'
import { IStockInfoRepository, ITransactionsRepository } from '../repositories'

export class CreateFirstTransactionForStockService {
  public constructor(
    private transactionsRepository: ITransactionsRepository,
    private stockInfoRepository: IStockInfoRepository,
  ) {}

  public async create(
    transactionData: Omit<ITransactionData, 'id' | 'stockId'>,
    stockInfoData: Omit<IStockInfoData, 'id'>,
  ): Promise<void> {
    if (transactionData.type === 'OUT') {
      throw new InvalidTransactionError(
        'Cannot create outcome transaction as first the first one.',
      )
    }

    const stockInfo = StockInfo.create({ ...stockInfoData })

    await this.stockInfoRepository.save(stockInfo)

    const transaction = Transaction.create({
      ...transactionData,
      stockId: stockInfo.id.value,
    })

    await this.transactionsRepository.save(transaction)
  }
}
