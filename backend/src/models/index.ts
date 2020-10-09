import { container } from 'tsyringe'
import { model } from 'mongoose'
import { IUser, UserModel, UserSchema } from './User'
import {
  ITransaction,
  TransactionModel,
  TransactionSchema,
} from './Transaction'
import { IStockInfo, StockInfoModel, StockInfoSchema } from './StockInfo'

interface Models {
  User: UserModel
  Transaction: TransactionModel
  StockInfo: StockInfoModel
}

container.register('models', {
  useFactory: () => ({
    User: model<IUser>('User', UserSchema),
    Transaction: model<ITransaction>('Transaction', TransactionSchema),
    StockInfo: model<IStockInfo>('StockInfo', StockInfoSchema),
  }),
})

container.register('User', {
  useFactory: ctr => ctr.resolve<Models>('models').User,
})

container.register('Transaction', {
  useFactory: ctr => ctr.resolve<Models>('models').Transaction,
})

container.register('StockInfo', {
  useFactory: ctr => ctr.resolve<Models>('models').StockInfo,
})
