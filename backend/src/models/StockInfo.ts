import { model, Schema, Types, Document } from "mongoose";

export interface IStockInfo extends Document {
  _id: Types.ObjectId
  ticker: string
  fullName: string
}

const StockInfoSchema = new Schema<IStockInfo>({
  ticker: { type: String, uppercase: true },
  fullName: String,
})

export const StockInfo = model<IStockInfo>('StockInfo', StockInfoSchema)
