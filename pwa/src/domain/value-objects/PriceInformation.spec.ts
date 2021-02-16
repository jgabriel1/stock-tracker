import { PriceInformation } from './PriceInformation'
import { Amount } from './Amount'
import { Ticker } from './Ticker'

describe('PriceInformation', () => {
  it('should create a value object to hold the price information for a stock.', () => {
    const inputData = {
      ticker: 'AAPL',
      regularMarketPrice: 100.0,
    }

    const priceInfo = PriceInformation.create(inputData)

    expect(priceInfo).toHaveProperty('ticker')
    expect(priceInfo).toHaveProperty('regularMarketPrice')

    expect(priceInfo.ticker).toBeInstanceOf(Ticker)
    expect(priceInfo.regularMarketPrice).toBeInstanceOf(Amount)

    expect(priceInfo.ticker.value).toEqual(inputData.ticker)
    expect(priceInfo.regularMarketPrice.value).toEqual(
      inputData.regularMarketPrice,
    )
  })
})
