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
        <tbody>
            <tr className='stock-container' onClick={() => setSaleMode(!saleMode)}>
                <th scope='row'>{ticker}</th>
                <td>{currently_owned_shares}</td>
                <td>{average_bought_price.toFixed(2)}</td>
                <td>{value_invested.toFixed(2)}</td>
                <td>{regularMarketPrice.toFixed(2)}</td>
                <td>{current_worth.toFixed(2)}</td>
                <td>{potential_profit.toFixed(2)}</td>
            </tr>
            {
                saleMode ?
                    <tr>
                        <td colSpan='8'>
                            <form onSubmit={handleSaleTransaction}>
                                <div className='form-row'>
                                    <div className='col-1  ticker-container'>{ticker}</div>

                                    <div className='col-3'>
                                        <InputField
                                            label='Unit Value '
                                            htmlId='unit-value-field'
                                            htmlType='number'
                                            value={unitValue}
                                            valueSetter={setUnitValue}
                                        />
                                    </div>

                                    <div className='col-3'>
                                        <InputField
                                            label='Quantity '
                                            htmlId='quantity-field'
                                            htmlType='number'
                                            value={quantity}
                                            valueSetter={setQuantity}
                                        />
                                    </div>

                                    <div className='col-3'>
                                        <InputField
                                            label='Total Value '
                                            htmlId='total-value-field'
                                            htmlType='number'
                                            value={totalValue}
                                            valueSetter={setTotalValue}
                                        />
                                    </div>

                                    <div className='col sale-button-container'>
                                        <button type='submit' className='btn btn-dark'>Sell</button>
                                    </div>
                                </div>
                            </form>
                        </td>
                    </tr>
                    :
                    null
            }
        </tbody>
    )
}

export default Stock
