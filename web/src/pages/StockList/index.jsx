import React, { useState, useEffect } from 'react'

import Stock from '../../components/Stock'
import NewTransaction from '../../components/NewTransaction'

import api from '../../services/api'
import { getToken } from '../../utils/tokenHandler'

import './styles.css'

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
            <NewTransaction />
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Current</th>
                        <th>Average Price</th>
                        <th>Invested</th>
                        <th>Current Price</th>
                        <th>Current Worth</th>
                        <th>Potential Profit</th>
                    </tr>
                </thead>
                {stocks.map(stock => (
                    <Stock
                        key={stock.ticker}
                        ticker={stock.ticker}
                        currently_owned_shares={stock.currently_owned_shares}
                        average_bought_price={stock.average_bought_price}
                        regularMarketPrice={stock.regularMarketPrice}
                    />
                ))}
            </table>
        </div>
    )
}

export default StockList
