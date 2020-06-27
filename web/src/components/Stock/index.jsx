import React, { useState, useEffect } from 'react'

import InputField from '../InputField'

import api from '../../services/api'
import { getToken } from '../../utils/tokenHandler'

import './styles.css'

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

    const [saleMode, setSaleMode] = useState(false)

    const [unitValue, setUnitValue] = useState('')
    const [quantity, setQuantity] = useState('')
    const [totalValue, setTotalValue] = useState('')

    useEffect(() => {
        setTotalValue(unitValue * quantity)
    }, [unitValue, quantity])

    function handleSaleTransaction(event) {
        event.preventDefault()

        const token = getToken()
        const headers = { Authorization: `Bearer ${token}` }

        const body = {
            ticker,
            quantity: -Number(quantity),
            total_value: -Number(totalValue)
        }

        api.post('/transactions', body, { headers })
            .catch(error => console.log(error))
    }

    return (
        <div className='stock-container'>
            <div id={ticker} className='row'>
                <div className='col'>{ticker}</div>
                <div className='col'>{currently_owned_shares}</div>
                <div className='col'>{average_bought_price.toFixed(2)}</div>
                <div className='col'>{value_invested.toFixed(2)}</div>
                <div className='col'>{regularMarketPrice.toFixed(2)}</div>
                <div className='col'>{current_worth.toFixed(2)}</div>
                <div className='col'>{potential_profit.toFixed(2)}</div>
                <div className='col'>
                    <button
                        type='button'
                        onClick={() => setSaleMode(!saleMode)}
                        className='btn btn-dark sell-stock-button'>Sell</button>
                </div>
            </div>
            {
                saleMode ?
                    <div className='sale-mode-container container'>
                        <form onSubmit={handleSaleTransaction}>
                            <div className='form-row'>
                                <div className='col'>{ticker}</div>

                                <div className='col'>
                                    <InputField
                                        label='Unit Value '
                                        htmlId='unit-value-field'
                                        htmlType='number'
                                        value={unitValue}
                                        valueSetter={setUnitValue}
                                    />
                                </div>

                                <div className='col'>
                                    <InputField
                                        label='Quantity '
                                        htmlId='quantity-field'
                                        htmlType='number'
                                        value={quantity}
                                        valueSetter={setQuantity}
                                    />
                                </div>

                                <div className='col'>
                                    <InputField
                                        label='Total Value '
                                        htmlId='total-value-field'
                                        htmlType='number'
                                        value={totalValue}
                                        valueSetter={setTotalValue}
                                    />
                                </div>

                                <div className='col sale-button-container'>
                                    <button type='submit' className='btn btn-dark'>Confirm</button>
                                    <button
                                        type='button'
                                        className='btn btn-dark'
                                        onClick={() => setSaleMode(!saleMode)}>Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    :
                    null
            }
        </div>
    )
}

export default Stock
