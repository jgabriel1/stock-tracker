import { IStockInfoSearchRepository } from '../../domain/repositories'
import { AllowedMarketSpecification } from '../../domain/specifications/AllowedMarketSpecification'

interface IRequest {
  searchValue: string
}

interface IResponse {
  stocks: Array<{
    ticker: string
    fullName: string
  }>
}

export class SearchStockInfoByNameUseCase {
  private stockInfoSearchRepository: IStockInfoSearchRepository

  private allowedMarketSpecification: AllowedMarketSpecification

  public constructor(stockInfoSearchRepository: IStockInfoSearchRepository) {
    this.stockInfoSearchRepository = stockInfoSearchRepository
    this.allowedMarketSpecification = new AllowedMarketSpecification()
  }

  public async execute({ searchValue }: IRequest): Promise<IResponse> {
    const possibleAnswers = await this.stockInfoSearchRepository.searchForName(
      searchValue,
    )

    return {
      stocks: possibleAnswers
        .filter(this.allowedMarketSpecification.isSatisfiedBy)
        .map(stock => {
          const { ticker, fullName } = stock

          return {
            ticker: ticker.value,
            fullName,
          }
        }),
    }
  }
}
