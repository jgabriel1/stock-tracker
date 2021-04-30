import { Connection, Repository } from 'typeorm'

import { StockInfoModel } from '../entities/StockInfoModel'

interface ICreateStockInfoData {
  ticker: string
  full_name: string
}

export class StockInfosRepository {
  private ormRepository: Repository<StockInfoModel>

  constructor(connection: Connection) {
    this.ormRepository = connection.getRepository(StockInfoModel)
  }

  public async createOrFindIfExists({
    ticker,
    full_name,
  }: ICreateStockInfoData): Promise<StockInfoModel> {
    let info = await this.ormRepository.findOne({
      ticker,
    })

    if (!info) {
      info = this.ormRepository.create({
        ticker,
        full_name,
      })

      await this.ormRepository.save(info)
    }

    return info
  }
}
