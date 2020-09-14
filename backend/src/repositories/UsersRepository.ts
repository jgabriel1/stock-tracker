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
      throw new Error(`Error creating user: ${err.message}`)
    }
  }

  public async findById(userId: string): Promise<IUser> {
    const user = await this.Model.findById(userId)

    if (!user) {
      throw new Error("This user doesn't exist.")
    }

    return user
  }

  public async findByName(name: string): Promise<IUser> {
    const user = await this.Model.findOne({ username: name })

    if (!user) {
      throw new Error("This user doesn't exist.")
    }

    return user
  }
}
