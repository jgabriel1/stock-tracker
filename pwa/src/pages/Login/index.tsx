import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Button from '../../components/Button'
import KeyboardView from '../../components/KeyboardView'
import ReturnButton from '../../components/ReturnButton'

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
                    .then(() => {
                        navigation.navigate('Dashboard', {
                            loadData: true
                        })
                    })
            })
            .catch(error => console.log(error))
    }

    return (
        <KeyboardView>

            <ReturnButton />

            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder={'Username'}
                    value={username}
                    onChangeText={text => setUsername(text)}
                    autoCapitalize={'none'}
                />

                <TextInput
                    style={styles.input}
                    placeholder={'Password'}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    autoCapitalize={'none'}
                />

                <Button text='Login' onPress={handleSubmitLogin} />
            </View>

        </KeyboardView>
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
})
