import React, { useState, useContext } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Button from '../../components/Button'
import KeyboardView from '../../components/KeyboardView'
import ReturnButton from '../../components/ReturnButton'

import API from '../../services/api'
import * as Yahoo from '../../services/yahooFinance/stockInfo'
import DataContext from '../../store/dataContext'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { state, dispatch } = useContext(DataContext)

    const navigation = useNavigation()

    async function handleSubmitLogin() {
        await API.postLogin(username, password)

        const stocks = await API.getStocksData()
        dispatch({ type: 'SET_STOCKS', payload: stocks })

        const tickers = Array.from(stocks.keys())
        const yahooStocks = await Yahoo.getStockInfo(tickers)
        dispatch({ type: 'SET_YAHOO', payload: yahooStocks })

        navigation.navigate('Dashboard')
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
