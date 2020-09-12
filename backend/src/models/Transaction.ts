import { Schema, Document, Types, model } from 'mongoose'

export interface ITransaction extends Document {
  _id: Types.ObjectId
  stockId: Types.ObjectId
  creatorId: Types.ObjectId
  value: number
  quantity: number
  type: 'income' | 'outcome'
  extraCosts?: number
  createdAt: Date
  updatedAt: Date
}


const TransactionSchema = new Schema<ITransaction>({
  stockId: { type: Types.ObjectId, ref: 'StockInfo' },
  creatorId: { type: Types.ObjectId, ref: 'User' },
  value: Number,
  quantity: Number,
  type: String,
  extraCosts: { type: Number, required: false },
  createdAt: Date,
  updatedAt: Date,
})

export const Transaction = model<ITransaction>('Transaction', TransactionSchema)
