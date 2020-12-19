import { CreateStockInfoTable1608349125091 } from './1608349125091-CreateStockInfoTable'
import { CreateTransactionsTable1608349646829 } from './1608349646829-CreateTransactionsTable'
import { CreateTransactionStockForeignKey1608350305462 } from './1608350305462-CreateTransactionStockForeignKey'

export const migrations = [
  CreateStockInfoTable1608349125091,
  CreateTransactionsTable1608349646829,
  CreateTransactionStockForeignKey1608350305462,
]
