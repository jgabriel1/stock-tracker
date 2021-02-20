import { Transaction } from '../../domain/models/Transaction'
import {
  IStockBalanceRepository,
  IStockInfoRepository,
  ITransactionsRepository,
} from '../../domain/repositories'
import {
  CreateFirstTransactionForStockService,
  ValidateOutcomeTransactionService,
} from '../../domain/services'

import { Ticker } from '../../domain/value-objects/Ticker'

interface IRequest {
  type: 'IN' | 'OUT'
  value: number
  quantity: number
  stockInfo: {
    ticker: string
    fullName: string
    market: string
  }
}

export class CreateNewTransactionUseCase {
  private createFirstTransactionForStock: CreateFirstTransactionForStockService

  private validateOutcomeTransaction: ValidateOutcomeTransactionService

  public constructor(
    private stockInfoRepository: IStockInfoRepository,
    private transactionsRepository: ITransactionsRepository,
    private stockBalanceRepository: IStockBalanceRepository,
  ) {
    this.createFirstTransactionForStock = new CreateFirstTransactionForStockService(
      transactionsRepository,
      stockInfoRepository,
    )

    this.validateOutcomeTransaction = new ValidateOutcomeTransactionService(
      transactionsRepository,
      stockBalanceRepository,
    )
  }

  public async execute({
    type,
    value,
    quantity,
    stockInfo,
  }: IRequest): Promise<void> {
    const stock = await this.stockInfoRepository.findStockByTicker(
      Ticker.create(stockInfo.ticker),
    )

    if (!stock) {
      await this.createFirstTransactionForStock.create(
        { type, quantity, value },
        { ...stockInfo },
      )

      return
    }

    const transaction = Transaction.create({
      type,
      quantity,
      value,
      stockId: stock.id.value,
    })

    if (type === 'OUT') {
      // TODO: maybe refactor this "service" logic to a specification that will
      // return a boolean and validate the outcome transaction. Or maybe have a
      // specific OutcomeTransaction class that will validate it (less likely).
      await this.validateOutcomeTransaction.validateAndSave(transaction)

      return
    }

    await this.transactionsRepository.save(transaction)
  }
}
