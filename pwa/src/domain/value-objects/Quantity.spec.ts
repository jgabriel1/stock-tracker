import { DomainValidationError } from '../errors/DomainValidationError'
import { Quantity } from './Quantity'

describe('Quantity', () => {
  it('should create a quantity object value', () => {
    const inputValue = 10

    const quantity = Quantity.create(inputValue)

    expect(quantity).toBeInstanceOf(Quantity)
    expect(quantity).toHaveProperty('value')
    expect(quantity.value).toEqual(inputValue)
  })
  it('should not accept decimal values to be the quantity', () => {
    const inputValue = 3.1415

    const createQuantity = () => Quantity.create(inputValue)

    expect(createQuantity).toThrow(DomainValidationError)
  })
})
