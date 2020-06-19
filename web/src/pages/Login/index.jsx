import React, { useState } from 'react'

import InputField from '../../components/InputField'

import './styles.css'

const Login = props => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(event) {
        event.preventDefault()
        console.log(username, password)
    }

    return (
        <div className='login-container'>
            <form onSubmit={handleSubmit}>
                <InputField
                    label='Username: '
                    htmlId='username'
                    htmlType='text'
                    value={username}
                    valueSetter={setUsername}
                />

                <InputField
                    label='Password: '
                    htmlId='password'
                    htmlType='password'
                    value={password}
                    valueSetter={setPassword}
                />

                <div className='login-button-container'>
                    <button type='submit' className='btn btn-dark login-btn'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login
