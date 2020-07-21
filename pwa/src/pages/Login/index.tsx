import React, { useState } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Button from '../../components/Button'
import KeyboardView from '../../components/KeyboardView'
import ReturnButton from '../../components/ReturnButton'

import API from '../../services/api'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    function handleSubmitLogin() {
        API.postLogin(username, password)
            .then(() => {
                navigation.navigate('Dashboard', {
                    loadData: true
                })
            })
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
