import { isString, isUppercase } from 'class-validator'

import { DomainValidationError } from '../errors/DomainValidationError'

export class Ticker {
  public readonly value: string

  private constructor(value: string) {
    this.value = value

    Object.freeze(this)
  }

  private isValid(): boolean {
    return (
      // Ticker must be a string
      isString(this.value) &&
      // Tickers must be uppercase
      isUppercase(this.value)
    )
  }

  public static create(ticker: string): Ticker {
    const tickerObject = new Ticker(ticker)

    if (!tickerObject.isValid()) {
      throw new DomainValidationError(
        'Invalid stock ticker: Ticker mus be upper case.',
      )
    }

    return tickerObject
  }
}

export function tickerFactory(ticker: string): Ticker {
  const upperCaseTicker = ticker.toUpperCase()

  return Ticker.create(upperCaseTicker)
}
