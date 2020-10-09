import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { StocksWalletService } from '../services/StocksWalletService'

export class StocksController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { _id: userId } = request.user

    const stocksWallet = container.resolve(StocksWalletService)

    const stocks = await stocksWallet.execute({ userId })

    return response.json(stocks)
  }
}
