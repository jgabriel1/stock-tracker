import { ClientSession } from 'mongoose'
import { inject, injectable } from 'tsyringe'
import { IStockInfo, StockInfoModel } from '../models/StockInfo'
import { BaseRepository } from './BaseRepository'

interface CreateStockInfoDTO {
  ticker: string
  fullName: string
}

@injectable()
export class StockInfoRepository extends BaseRepository<IStockInfo> {
  constructor(
    @inject('StockInfo')
    Model: StockInfoModel,
  ) {
    super(Model)
  }

  public async create(
    { ticker, fullName }: CreateStockInfoDTO,
    session?: ClientSession,
  ): Promise<IStockInfo> {
    try {
      const stockInfo = new this.Model({
        ticker,
        fullName,
      })

      await stockInfo.save({ session })

      return stockInfo
    } catch (err) {
      await session?.abortTransaction()
      throw new Error(`Error creating stock info: ${err.message}`)
    }
  }

  public async findByTicker(
    ticker: string,
    session?: ClientSession,
  ): Promise<IStockInfo | null> {
    const stockInfo = await this.Model.findOne({ ticker }).session(
      session || null,
    )

    return stockInfo
  }
}
