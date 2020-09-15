import { Schema, Document, Types, Model } from 'mongoose'

import { ITransaction } from './Transaction'

export interface IUser extends Document {
  _id: Types.ObjectId
  username: string
  email: string
  password: string
  transactions: ITransaction[] | Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    transactions: [{ type: Types.ObjectId, ref: 'Transaction' }],
  },
  { timestamps: true, _id: true },
)

export type UserModel = Model<IUser>
