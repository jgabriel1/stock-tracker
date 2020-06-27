import React from 'react'

const Stock = props => {
    const {
        ticker,
        currently_owned_shares,
        average_bought_price,
        regularMarketPrice
    } = props

    const value_invested = currently_owned_shares * average_bought_price
    const current_worth = currently_owned_shares * regularMarketPrice
    const potential_profit = current_worth - value_invested

    return (
        <tr id={ticker} className='stock-container'>
            <td>{ticker}</td>
            <td>{currently_owned_shares}</td>
            <td>{average_bought_price.toFixed(2)}</td>
            <td>{value_invested.toFixed(2)}</td>
            <td>{regularMarketPrice.toFixed(2)}</td>
            <td>{current_worth.toFixed(2)}</td>
            <td>{potential_profit.toFixed(2)}</td>
        </tr>
    )
}

export default Stock
