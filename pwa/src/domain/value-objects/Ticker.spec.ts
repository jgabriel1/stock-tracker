import { DomainValidationError } from '../errors/DomainValidationError'
import { Ticker, tickerFactory } from './Ticker'

describe('Ticker', () => {
  it('should not accept lowercase values for the ticker.', () => {
    const inputValue = 'lowecaseticker'

    const createInvalidTicker = () => Ticker.create(inputValue)

    expect(createInvalidTicker).toThrow(DomainValidationError)
  })

  it('should be able to always create a valid ticker when using the factory function', () => {
    const loweCaseInput = 'tsla'

    const tesla = tickerFactory(loweCaseInput)

    expect(tesla).toBeInstanceOf(Ticker)

    expect(tesla.value).toEqual('TSLA')
  })
})
