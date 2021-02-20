import { Transaction } from '../models/Transaction'
import { UniqueIdentifier } from '../value-objects/UniqueIdentifier'

export interface ITransactionsRepository {
  save(transaction: Transaction): Promise<void>
  findAllForStock(stockId: UniqueIdentifier): Promise<Transaction[]>
  findOne(transactionId: UniqueIdentifier): Promise<Transaction | null>
}
