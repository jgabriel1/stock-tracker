import { Schema, Types, Document, Model } from 'mongoose'

export interface IStockInfo extends Document {
  _id: Types.ObjectId
  ticker: string
  fullName: string
  createdAt: Date
  updatedAt: Date
}

export const StockInfoSchema = new Schema<IStockInfo>(
  {
    ticker: {
      type: String,
      uppercase: true,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, _id: true, autoCreate: true },
)

export type StockInfoModel = Model<IStockInfo>
