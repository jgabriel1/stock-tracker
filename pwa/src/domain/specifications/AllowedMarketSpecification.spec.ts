import { StockInfo } from '../value-objects/StockInfo'
import { AllowedMarketSpecification } from './AllowedMarketSpecification'

describe('AllowedMarketSpecification', () => {
  it('should return true for markets that are in the list of allowed ones', () => {
    const info = StockInfo.create({
      ticker: 'PETR3.SA',
      fullName: 'Petróleo Brasileiro S.A. - Petrobras',
      market: 'SAO',
    })

    const allowedMarkets = ['SAO']

    const specification = new AllowedMarketSpecification(allowedMarkets)

    expect(specification.isSatisfiedBy(info)).toBe(true)
  })

  it('should return false for markets that are not in the list of allowed ones', () => {
    const info = StockInfo.create({
      ticker: 'TSLA',
      fullName: 'Tesla, Inc.',
      market: 'NMS',
    })

    const allowedMarkets = ['SAO']

    const specification = new AllowedMarketSpecification(allowedMarkets)

    expect(specification.isSatisfiedBy(info)).toBe(false)
  })
})
