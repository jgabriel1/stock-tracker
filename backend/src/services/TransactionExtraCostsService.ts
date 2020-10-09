import { inject, injectable } from 'tsyringe'
import { TransactionsRepository } from '../repositories/TransactionsRepository'

interface Request {
  transactionId: string
  value: number
}

@injectable()
export class TransactionExtraCostsService {
  constructor(
    @inject(TransactionsRepository)
    private transactionsRepository: TransactionsRepository,
  ) {}

  public async execute({ transactionId, value }: Request): Promise<void> {
    const transaction = await this.transactionsRepository.findById(
      transactionId,
    )

    transaction.extraCosts = value
    await transaction.save()
  }
}
