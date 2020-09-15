import { Schema, Types, Document, Model, model } from 'mongoose'
import { container } from 'tsyringe'

export interface IStockInfo extends Document {
  _id: Types.ObjectId
  ticker: string
  fullName: string
  createdAt: string
  updatedAt: string
}

const StockInfoSchema = new Schema<IStockInfo>(
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

export const StockInfo = container.register<StockInfoModel>('StockInfo', {
  useFactory: () => model<IStockInfo>('StockInfo', StockInfoSchema),
})
