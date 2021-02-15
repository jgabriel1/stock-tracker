import { Stock } from '../models/Stock'
import { Transaction } from '../models/Transaction'
import { UniqueIdentifier } from '../value-objects/UniqueIdentifier'

export interface ITransactionsRepository {
  save(transaction: Transaction): Promise<void>
  loadAllForStock(stock: Stock): Promise<void>
  findOne(transactionId: UniqueIdentifier): Promise<Transaction | null>
  delete(transactionId: UniqueIdentifier): Promise<void>
}
