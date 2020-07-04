import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import api from '../../services/api'
import { setAuthToken } from '../../utils/tokenHandler'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    function handleSubmitLogin() {
        const loginForm = new FormData()

        loginForm.append('username', username)
        loginForm.append('password', password)

        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }

        api.post('auth/token', loginForm, { headers })
            .then(response => {
                const { access_token } = response.data

                setAuthToken(access_token)
                    .then(() => { navigation.navigate('Dashboard') })
            })
            .catch(error => console.log(error))
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={'Username'}
                value={username}
                onChangeText={text => setUsername(text)}
            />

            <TextInput
                style={styles.input}
                placeholder={'Password'}
                value={password}
                onChangeText={text => setPassword(text)}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSubmitLogin}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    input: {
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 4,
        padding: 16,
        width: '80%',
        fontSize: 16,
        marginBottom: 16
    },

    buttonContainer: {
        width: '80%',
    },

    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#999',
        height: 48,
        borderRadius: 4,
        marginBottom: 16
    },

    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    }
})
