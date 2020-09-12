import { Schema, Document, Types, model } from 'mongoose'

export interface IUser extends Document {
  _id: Types.ObjectId
  username: string
  email: string
  password: string
  transactionIds: Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
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
  createdAt: Date,
  updatedAt: Date,
})

export const User = model<IUser>('User', UserSchema)
