import React, { useState } from 'react'

import InputField from '../InputField'

import api from '../../services/api'
import { getToken } from '../../utils/tokenHandler'

import './styles.css'

const NewTransaction = props => {
    const [ticker, setTicker] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [unitValue, setUnitValue] = useState(0)
    const [totalValue, setTotalValue] = useState(0)

    function handleCreate(event) {
        event.preventDefault()

        const token = getToken()

        const headers = {
            Authorization: `Bearer ${token}`
        }

        const body = {
            ticker,
            quantity: Number(quantity),
            total_value: Number(totalValue),
        }

        console.log(body)

        api.post('/transactions', body, { headers })
            .catch(error => console.log(error))
    }

    return (
        <div className='new-transaction-container'>
            <form onSubmit={handleCreate} className='new-transaction-form'>
                <fieldset>
                    <div className='form-row'>
                        <div className='col'>
                            <InputField
                                label='Ticker '
                                htmlId='ticker-field'
                                htmlType='text'
                                value={ticker}
                                valueSetter={setTicker}
                            />
                        </div>

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
                                value={totalValue || quantity * unitValue}
                                valueSetter={setTotalValue}
                            />
                        </div>
                    </div>
                </fieldset>

                <div className='button-container'>
                    <button type='submit' className='btn btn-dark'>Create</button>
                </div>
            </form>
        </div>
    )
}

export default NewTransaction
