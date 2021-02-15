import { DomainValidationError } from '../errors/DomainValidationError'
import { Amount } from './Amount'

describe('Amount', () => {
  it('should create a value onbject "value"', () => {
    const inputAmount = 2.5

    const amount = Amount.create(inputAmount)

    expect(amount).toBeInstanceOf(Amount)
    expect(amount).toHaveProperty('value')
    expect(amount.value).toEqual(inputAmount)
  })

  it('should not be able to accept negative values', () => {
    const inputAmount = -2.5

    const createInvalidAmount = () => Amount.create(inputAmount)

    expect(createInvalidAmount).toThrow(DomainValidationError)
  })
})
