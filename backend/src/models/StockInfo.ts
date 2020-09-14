import { Schema, Types, Document, Model } from 'mongoose'

export interface IStockInfo extends Document {
  _id: Types.ObjectId
  ticker: string
  fullName: string
}

export const StockInfoSchema = new Schema<IStockInfo>({
  ticker: { type: String, uppercase: true },
  fullName: String,
})

export type StockInfoModel = Model<IStockInfo>
