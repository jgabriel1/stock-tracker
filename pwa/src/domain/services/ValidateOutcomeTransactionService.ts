import { Transaction } from '../models/Transaction'
import {
  IStockBalanceRepository,
  ITransactionsRepository,
} from '../repositories'
import { InvalidTransactionError } from '../errors/InvalidTransactionError'

export class ValidateOutcomeTransactionService {
  public constructor(
    private transactionsRepository: ITransactionsRepository,
    private stockBalanceRepository: IStockBalanceRepository,
  ) {}

  public async validateAndSave(transaction: Transaction): Promise<void> {
    const stockBalance = await this.stockBalanceRepository.findBalanceForStockId(
      transaction.stockId,
    )

    if (!stockBalance) {
      throw new InvalidTransactionError(
        'Invalid transaction: Impossible to create outcome transaction for inexistent stock.',
      )
    }

    if (transaction.quantity.value > stockBalance.currentlyOwnedShares.value) {
      throw new InvalidTransactionError(
        'Invalid transaction: cannot create outcome transaction for more shares that you own.',
      )
    }

    await this.transactionsRepository.save(transaction)
  }
}
