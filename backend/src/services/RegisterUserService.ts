import { injectable, inject } from 'tsyringe'
import { UsersRepository } from '../repositories/UsersRepository'

@injectable()
export class RegisterUserService {
  constructor(
    @inject(UsersRepository)
    private usersRepository: UsersRepository,
  ) { }

  public execute(): string {
    return this.usersRepository.find()
  }
}
