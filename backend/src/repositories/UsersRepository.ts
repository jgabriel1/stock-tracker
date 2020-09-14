import { inject, injectable } from 'tsyringe'
import { IUser, UserModel } from '../models/User'
import { BaseRepository } from './BaseRepository'

interface CreateUserDTO {
  username: string
  password: string
  email: string
}

@injectable()
export class UsersRepository extends BaseRepository<IUser> {
  constructor(
    @inject('User')
    Model: UserModel,
  ) {
    super(Model)
  }

  public async create({
    username,
    password,
    email,
  }: CreateUserDTO): Promise<IUser> {
    try {
      const user = new this.Model({
        username,
        password,
        email,
      })

      await user.save()

      return user
    } catch (err) {
      throw new Error('Could not create user.')
    }
  }
}
