import {
  Model as MongooseModel,
  Document,
  ClientSession,
  startSession,
} from 'mongoose'

export class BaseRepository<T extends Document> {
  public session?: ClientSession

  constructor(protected Model: MongooseModel<T>) {}

  public async beginTransaction(): Promise<void> {
    this.session = await startSession()
    this.session.startTransaction()
  }
}
