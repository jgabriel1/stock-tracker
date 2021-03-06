import { inject, injectable } from 'tsyringe'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { UsersRepository } from '../repositories/UsersRepository'
import { HttpException } from '../errors/HttpException'
import tokenConfig from '../config/token'

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
  ) {}

  private static async checkPassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return compare(password, hash)
  }

  private static generateSignedToken(payload: TokenPayload): string {
    return sign(payload, tokenConfig.SECRET, {
      algorithm: tokenConfig.ALGORITHM,
    })
  }

  public async execute({ username, password }: Request): Promise<string> {
    const user = await this.usersRepository.findByName(username)

    if (!user) {
      throw new HttpException('This user does not exist.')
    }

    const passwordsMatch = await AuthTokenService.checkPassword(
      password,
      user.password,
    )

    if (!passwordsMatch) {
      throw new HttpException('Wrong username/password combination.', 401)
    }

    const token = AuthTokenService.generateSignedToken({
      _id: user.id,
      username: user.username,
      email: user.email,
    })

    return token
  }
}
