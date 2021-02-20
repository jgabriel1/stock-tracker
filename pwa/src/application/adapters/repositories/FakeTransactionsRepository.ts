import { Transaction } from '../../../domain/models/Transaction'
import { ITransactionsRepository } from '../../../domain/repositories'
import { UniqueIdentifier } from '../../../domain/value-objects/UniqueIdentifier'

export class FakeTransactionsRepository implements ITransactionsRepository {
  private transactions: Transaction[]

  public constructor() {
    this.transactions = []
  }

  public async save(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction)
  }

  public async findOne(
    transactionId: UniqueIdentifier,
  ): Promise<Transaction | null> {
    const transaction = this.transactions.find(t => t.id === transactionId)

    return transaction || null
  }

  public async findAllForStock(
    stockId: UniqueIdentifier,
  ): Promise<Transaction[]> {
    return this.transactions.filter(t => t.stockId.value === stockId.value)
  }
}
