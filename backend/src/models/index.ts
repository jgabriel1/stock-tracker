import { model } from 'mongoose'
import { container } from 'tsyringe'
import { IUser, UserSchema, UserModel } from './User'
import { IStockInfo, StockInfoSchema, StockInfoModel } from './StockInfo'
import {
  ITransaction,
  TransactionSchema,
  TransactionModel,
} from './Transaction'

container.register<UserModel>('User', {
  useFactory: () => model<IUser>('User', UserSchema),
})

container.register<StockInfoModel>('StockInfo', {
  useFactory: () => model<IStockInfo>('StockInfo', StockInfoSchema),
})

container.register<TransactionModel>('Transaction', {
  useFactory: () => model<ITransaction>('Transaction', TransactionSchema),
})
