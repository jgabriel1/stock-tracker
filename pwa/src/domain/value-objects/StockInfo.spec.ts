import { Ticker } from './Ticker'
import { StockInfo } from './StockInfo'
import { DomainValidationError } from '../errors/DomainValidationError'

describe('StockInfo', () => {
  it('should create a value object to hold full name and ticker information', () => {
    const inputData = {
      ticker: 'AAPL',
      fullName: 'Apple Inc.',
      market: 'NMS',
    }

    const stockName = StockInfo.create(inputData)

    expect(stockName).toHaveProperty('ticker')
    expect(stockName).toHaveProperty('fullName')
    expect(stockName).toHaveProperty('market')

    expect(stockName.ticker).toBeInstanceOf(Ticker)

    expect(stockName.ticker.value).toEqual(inputData.ticker)
    expect(stockName.fullName).toEqual(inputData.fullName)
    expect(stockName.market).toEqual(inputData.market)
  })

  it('should not create a value object if the ticker is invalid', () => {
    const inputData = {
      ticker: 'aapl',
      fullName: 'Apple Inc.',
      market: 'NMS',
    }

    const createInvalidStockName = () => StockInfo.create(inputData)

    expect(createInvalidStockName).toThrow(DomainValidationError)
  })

  it('should not create a value object if the market name is invalid', () => {
    const inputData = {
      ticker: 'AAPL',
      fullName: 'Apple Inc.',
      market: 'abc123',
    }

    const createInvalidMarketName = () => StockInfo.create(inputData)

    expect(createInvalidMarketName).toThrow(DomainValidationError)
  })
})
