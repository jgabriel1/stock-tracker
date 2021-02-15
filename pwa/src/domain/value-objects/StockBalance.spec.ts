import { Amount } from './Amount'
import { Quantity } from './Quantity'
import { StockBalance } from './StockBalance'

describe('StockBalance', () => {
  it('should create a balance value object that will hold the current stock state information', () => {
    const balanceData = {
      currently_owned_shares: 10,
      average_bought_price: 100,
      total_invested: 1000,
    }

    const balanceObj = StockBalance.create(balanceData)

    expect(balanceObj).toHaveProperty('currently_owned_shares')
    expect(balanceObj).toHaveProperty('average_bought_price')
    expect(balanceObj).toHaveProperty('total_invested')

    expect(balanceObj.currently_owned_shares).toBeInstanceOf(Quantity)
    expect(balanceObj.average_bought_price).toBeInstanceOf(Amount)
    expect(balanceObj.total_invested).toBeInstanceOf(Amount)
  })
})
