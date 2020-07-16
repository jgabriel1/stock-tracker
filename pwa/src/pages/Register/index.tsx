import React, { useState } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Button from '../../components/Button'
import KeyboardView from '../../components/KeyboardView'

import api from '../../services/api'

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    function handleSubmitRegistration() {
        const data = {
            username,
            email,
            password
        }

        api.post('auth/register', data)
            .then(() => {
                navigation.navigate('Login')

                setUsername('')
                setEmail('')
                setPassword('')
            })
            .catch(error => alert(error))
    }

    return (
        <KeyboardView>
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
                    placeholder={'Email'}
                    value={email}
                    onChangeText={text => setEmail(text)}
                    autoCapitalize={'none'}
                    keyboardType={'email-address'}
                />

                <TextInput
                    style={styles.input}
                    placeholder={'Password'}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    autoCapitalize={'none'}
                    secureTextEntry={true}
                />

                <Button text={'Register'} onPress={handleSubmitRegistration} />
            </View>
        </KeyboardView>
    )
}

export default Register

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
