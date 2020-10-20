import { injectable, inject } from 'tsyringe'
import { hash } from 'bcrypt'
import { UsersRepository } from '../repositories/UsersRepository'
import { HttpException } from '../errors/HttpException'

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
  ) {}

  public async execute({
    username,
    password,
    email,
  }: Request): Promise<Response> {
    const userWithSameName = await this.usersRepository.findByName(username)

    if (userWithSameName) {
      throw new HttpException('Username already taken.')
    }

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new HttpException('Email already taken.')
    }

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
