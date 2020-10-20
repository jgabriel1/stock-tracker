import { Model as MongooseModel, Document } from 'mongoose'

export class BaseRepository<T extends Document> {
  constructor(protected Model: MongooseModel<T>) {}
}
