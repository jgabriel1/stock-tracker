import React, { useState, useEffect } from 'react'

import api from '../../services/api'
import { getToken } from '../../utils/tokenHandler'

const StockList = (props) => {
    const [stocks, setStocks] = useState({})

    useEffect(() => {
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0c3RvY2tiZWFyZXIiLCJleHAiOjE1OTMwMDc1Mzh9.JX4lFgPhIipHlxls7FlnmzMGT7olTWJjyPdTt41uC54'
        const header = { 'Authorization': `Bearer ${token}` }

        api.get('stocks', { headers: header })
            .then(response => {
                const { data } = response
                setStocks(data)
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <div className='container'>
            {Object.keys(stocks).map(ticker => {
                const { n_shares, price_bought, regularMarketPrice } = stocks[ticker]
                const variation = 100 * (regularMarketPrice / price_bought - 1)
                const profitOrLoss = (n_shares * price_bought) * variation / 100

                return (
                    <div className='stock-container'>
                        <p>{ticker}</p>
                        <p>Shares Owned: {n_shares}</p>
                        <p>Price Bought: {price_bought}</p>
                        <p>Current Price: {regularMarketPrice}</p>
                        <p>Profit/Loss: {`${variation.toFixed(2)}%`}</p>
                        <p>Total Invested: {n_shares * price_bought}</p>
                        <p>Total Profit/Loss: {profitOrLoss}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default StockList
