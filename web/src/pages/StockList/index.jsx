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
            <div className='table table-hover'>
                <div className='container'>
                    <div className='row'>
                        <div className='col'>Ticker</div>
                        <div className='col'>Current</div>
                        <div className='col'>Average Price</div>
                        <div className='col'>Value Invested</div>
                        <div className='col'>Current Market Price</div>
                        <div className='col'>Current Worth</div>
                        <div className='col'>Potential Profit</div>
                        <div className='col'></div>
                    </div>
                </div>
                <div className='container'>
                    {stocks.map(stock => (
                        <Stock
                            key={stock.ticker}
                            ticker={stock.ticker}
                            currently_owned_shares={stock.currently_owned_shares}
                            average_bought_price={stock.average_bought_price}
                            regularMarketPrice={stock.regularMarketPrice}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default StockList
