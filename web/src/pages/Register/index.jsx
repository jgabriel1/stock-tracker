import React, { useState } from 'react'

import InputField from '../../components/InputField'

import './styles.css'

const Register = props => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(event) {
        event.preventDefault()
        console.log(username, email, password)
    }

    return (
        <div className='container'>
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

                <div className='button-container'>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Register
