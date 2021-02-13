import { contains, isInstance, isUppercase } from 'class-validator'

import { Ticker } from '../data-objects/Ticker'
import { UniqueIdentifier } from '../data-objects/UniqueIdentifier'
import { DomainValidationError } from '../errors/DomainValidationError'
import { Transaction } from './Transaction'

interface IStockData {
  ticker: Ticker
  full_name: string
}

export class Stock {
  public readonly id: UniqueIdentifier

  public readonly ticker: Ticker

  public readonly full_name: string

  public transactions: Transaction[]

  public constructor({ ticker, full_name }: IStockData) {
    this.ticker = ticker
    this.full_name = full_name
    this.transactions = []

    if (!this.isValid()) {
      throw new DomainValidationError('Validation error.')
    }

    this.id = UniqueIdentifier.generateNew()
  }

  private isValid(): boolean {
    return (
      // Ticker must be an instance of the ticker data object
      isInstance(this.ticker, Ticker) &&
      // Ticker name must be upper case
      isUppercase(this.ticker.value) &&
      // Ticker name doesn't contain spaces
      !contains(this.ticker.value, ' ')
    )
  }

  public addTransaction(transaction: Transaction): void {
    this.transactions.push(transaction)
  }
}
