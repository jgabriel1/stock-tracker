import { DomainValidationError } from '../errors/DomainValidationError'
import { generateUniqueIdentifier, UniqueIdentifier } from './UniqueIdentifier'

describe('UniqueIdentifier', () => {
  it('should not accept not valid UUID values as input.', () => {
    const inputValue = 'random_string'

    const createInvalidId = () => UniqueIdentifier.create(inputValue)

    expect(createInvalidId).toThrow(DomainValidationError)
  })

  it('should be able to generate a new ID from factory.', () => {
    const id1 = generateUniqueIdentifier()

    const id2 = generateUniqueIdentifier()

    expect(id1).toBeInstanceOf(UniqueIdentifier)
    expect(id2).toBeInstanceOf(UniqueIdentifier)

    expect(id1.value).not.toEqual(id2.value)
  })
})
