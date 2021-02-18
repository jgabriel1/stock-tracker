import { Amount } from './Amount'
import { Quantity } from './Quantity'
import { StockBalance } from './StockBalance'
import { generateUniqueIdentifier, UniqueIdentifier } from './UniqueIdentifier'

describe('StockBalance', () => {
  it('should create a balance value object that will hold the current stock state information', () => {
    const balanceData = {
      stockId: generateUniqueIdentifier().value,
      currentlyOwnedShares: 10,
      averageBoughtPrice: 100,
      totalInvested: 1000,
    }

    const balanceObj = StockBalance.create(balanceData)

    expect(balanceObj).toHaveProperty('stockId')
    expect(balanceObj).toHaveProperty('currentlyOwnedShares')
    expect(balanceObj).toHaveProperty('averageBoughtPrice')
    expect(balanceObj).toHaveProperty('totalInvested')

    expect(balanceObj.stockId).toBeInstanceOf(UniqueIdentifier)
    expect(balanceObj.currentlyOwnedShares).toBeInstanceOf(Quantity)
    expect(balanceObj.averageBoughtPrice).toBeInstanceOf(Amount)
    expect(balanceObj.totalInvested).toBeInstanceOf(Amount)
  })
})
