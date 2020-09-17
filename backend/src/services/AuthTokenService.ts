import { inject, injectable } from 'tsyringe'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { UsersRepository } from '../repositories/UsersRepository'
import { AppError } from '../errors/AppError'

interface Request {
  username: string
  password: string
}

interface TokenPayload {
  _id: string
  username: string
  email: string
}

@injectable()
export class AuthTokenService {
  constructor(
    @inject(UsersRepository)
    private usersRepository: UsersRepository,
  ) { }

  private static async checkPassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return compare(password, hash)
  }

  private static generateSignedToken(payload: TokenPayload): string {
    return sign(payload, 'supersecret123', { algorithm: 'HS256' })
  }

  public async execute({ username, password }: Request): Promise<string> {
    const user = await this.usersRepository.findByName(username)

    const passwordsMatch = await AuthTokenService.checkPassword(
      password,
      user.password,
    )

    if (!passwordsMatch) {
      throw new AppError('Wrong username/password combination.', 401)
    }

    const token = AuthTokenService.generateSignedToken({
      _id: user.id,
      username: user.username,
      email: user.email,
    })

    return token
  }
}
