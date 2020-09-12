import { injectable } from 'tsyringe'

@injectable()
export class UsersRepository {
  public find(): string {
    return 'ho!'
  }
}
