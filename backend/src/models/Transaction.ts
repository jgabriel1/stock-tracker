import { Schema, Document, Types, Model } from 'mongoose'
import { IStockInfo } from './StockInfo'
import { IUser } from './User'

export interface ITransaction extends Document {
  _id: Types.ObjectId
  stockId: IStockInfo | Types.ObjectId
  creatorId: IUser | Types.ObjectId
  value: number
  quantity: number
  type: 'income' | 'outcome'
  extraCosts?: number
  createdAt: Date
  updatedAt: Date
}

export const TransactionSchema = new Schema<ITransaction>(
  {
    stockId: { type: Types.ObjectId, ref: 'StockInfo' },
    creatorId: { type: Types.ObjectId, ref: 'User' },
    value: { type: Number, required: true },
    quantity: { type: Number, required: true },
    type: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate: /\b(income|outcome)\b/,
    },
    extraCosts: { type: Number, required: false },
  },
  { timestamps: true, _id: true, autoCreate: true },
)

export type TransactionModel = Model<ITransaction>
