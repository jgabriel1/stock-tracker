import { Ticker } from './Ticker'
import { StockNameData } from './StockNameData'
import { DomainValidationError } from '../errors/DomainValidationError'

describe('StockNameData', () => {
  it('should create a value object to hold full name and ticker information', () => {
    const inputData = {
      ticker: 'AAPL',
      full_name: 'Apple Inc.',
    }

    const stockName = StockNameData.create(inputData)

    expect(stockName).toHaveProperty('ticker')
    expect(stockName).toHaveProperty('full_name')

    expect(stockName.ticker).toBeInstanceOf(Ticker)

    expect(stockName.ticker.value).toEqual(inputData.ticker)
    expect(stockName.full_name).toEqual(inputData.full_name)
  })

  it('should not create a value object if the ticker is invalid', () => {
    const inputData = {
      ticker: 'aapl',
      full_name: 'Apple Inc.',
    }

    const createInvalidStockName = () => StockNameData.create(inputData)

    expect(createInvalidStockName).toThrow(DomainValidationError)
  })
})
