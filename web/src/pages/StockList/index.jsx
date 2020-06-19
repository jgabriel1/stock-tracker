import React, { useState, useEffect } from 'react'

import Stock from '../../components/Stock'

import api from '../../services/api'
import { getToken } from '../../utils/tokenHandler'

const StockList = props => {
    const [stocks, setStocks] = useState([])

    useEffect(() => {
        const token = getToken()
        const headers = { 'Authorization': `Bearer ${token}` }

        api.get('stocks', { headers })
            .then(response => {
                const { stocks } = response.data
                setStocks(stocks)
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <div className='stocks-container'>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>ticker</th>
                        <th>nShares</th>
                        <th>priceBought</th>
                        <th>currentPrice</th>
                        <th>totalInvested</th>
                        <th>totalVariation</th>
                        <th>relativeVariation</th>
                    </tr>
                </thead>
                <tbody>
                    {stocks.map(stock => (
                        <Stock
                            key={stock.ticker}
                            ticker={stock.ticker}
                            nShares={stock.n_shares}
                            priceBought={stock.price_bought}
                            currentPrice={stock.regularMarketPrice}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default StockList
