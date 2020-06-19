import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import InputField from '../../components/InputField'

import api from '../../services/api'

import './styles.css'

const Register = props => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    function handleSubmit(event) {
        event.preventDefault()

        api.post('auth/register', { username, email, password })
            .then(response => {
                history.push('/login')
            })
            .catch(error => console.log(error))
    }

    return (
        <div className='register-container'>
            <form onSubmit={handleSubmit}>
                <InputField
                    label='Username: '
                    htmlId='username'
                    htmlType='text'
                    value={username}
                    valueSetter={setUsername}
                />

                <InputField
                    label='Email: '
                    htmlId='email'
                    htmlType='email'
                    value={email}
                    valueSetter={setEmail}
                />

                <InputField
                    label='Password: '
                    htmlId='password'
                    htmlType='password'
                    value={password}
                    valueSetter={setPassword}
                />

                <div className='register-button-container'>
                    <button type='submit' className='btn btn-dark register-btn'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Register
