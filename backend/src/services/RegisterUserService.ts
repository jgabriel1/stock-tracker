import { injectable, inject } from 'tsyringe'
import { hash } from 'bcrypt'
import { UsersRepository } from '../repositories/UsersRepository'

interface Request {
  username: string
  password: string
  email: string
}

interface Response {
  _id: string
  username: string
  email: string
}

@injectable()
export class RegisterUserService {
  constructor(
    @inject(UsersRepository)
    private usersRepository: UsersRepository,
  ) { }

  public async execute({
    username,
    password,
    email,
  }: Request): Promise<Response> {
    const hashedPassword = await hash(password, 4)

    const createdUser = await this.usersRepository.create({
      username,
      email,
      password: hashedPassword,
    })

    return {
      _id: createdUser._id.toHexString(),
      username: createdUser.username,
      email: createdUser.email,
    }
  }
}
