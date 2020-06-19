import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import InputField from '../../components/InputField'

import api from '../../services/api'
import { setToken } from '../../utils/tokenHandler'

import './styles.css'

const Login = props => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    function handleSubmit(event) {
        event.preventDefault()

        const loginForm = new FormData()

        loginForm.append('username', username)
        loginForm.append('password', password)

        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }

        api.post('/auth/token', loginForm, { headers })
            .then(response => {
                const { access_token } = response.data
                setToken(access_token)

                history.push('/dashboard')
            })
            .catch(error => console.log(error))
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
