import { Schema, Document, Types, Model, model } from 'mongoose'
import { container } from 'tsyringe'

import { ITransaction } from './Transaction'

export interface IUser extends Document {
  _id: Types.ObjectId
  username: string
  email: string
  password: string
  transactions: ITransaction[]
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
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

export const User = container.register<UserModel>('User', {
  useFactory: () => model<IUser>('User', UserSchema),
})
