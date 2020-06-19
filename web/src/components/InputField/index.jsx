import React from 'react'

import './styles.css'

const InputField = ({ label, htmlId, htmlType, value, valueSetter }) => (
    <div className='field'>
        <label htmlFor={htmlId}>{label}</label>
        <input
            type={htmlType}
            id={htmlId}
            onChange={event => valueSetter(event.target.value)}
            value={value}
            required={true}
        />
    </div>
)

export default InputField
