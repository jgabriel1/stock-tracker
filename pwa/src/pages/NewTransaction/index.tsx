import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { Provider } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import Modal from './components/Modal'
import StockPicker from './components/StockPicker'
import Button from '../../components/Button'
import ReturnButton from '../../components/ReturnButton'
import KeyboardView from '../../components/KeyboardView'

import API from '../../services/api'
import * as Yahoo from '../../services/yahooFinance/stockInfo'
import DataContext from '../../store/dataContext'


const NewTransaction = () => {
    const [ticker, setTicker] = useState('')
    const [quantity, setQuantity] = useState('')
    const [totalValue, setTotalValue] = useState('')

    const [showStockPicker, setShowStockPicker] = useState(false)

    const { state, dispatch } = useContext(DataContext)

    const navigation = useNavigation()

    async function handleSubmitTransaction() {
        const data = {
            ticker,
            quantity: Number(quantity),
            total_value: Number(totalValue),
        }

        await API.postNewTransaction(data)

        const stocks = await API.getStocksData()
        dispatch({ type: 'SET_STOCKS', payload: stocks })

        const tickers = Array.from(stocks.keys())
        const yahooStocks = await Yahoo.getStockInfo(tickers)
        dispatch({ type: 'SET_YAHOO', payload: yahooStocks })

        navigation.navigate('Dashboard')
    }

    return (
        <Provider>
            <KeyboardView style={styles.container}>

                <ReturnButton />

                <View style={styles.mainContent}>
                    <Text style={styles.title}>New Transaction</Text>

                    <TouchableOpacity onPress={() => setShowStockPicker(true)} style={styles.input}>
                        {
                            ticker ?
                                <Text style={{ fontSize: 16 }}>{ticker}</Text>
                                :
                                <Text style={{ fontSize: 16, color: '#ccc' }}>Stock Ticker</Text>
                        }
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        onChangeText={text => setQuantity(text)}
                        autoCapitalize='none'
                        placeholder='Quantity'
                        keyboardType='number-pad'
                    />

                    <TextInput
                        style={styles.input}
                        onChangeText={text => setTotalValue(text)}
                        autoCapitalize='none'
                        placeholder='Total Value'
                        keyboardType='number-pad'
                    />

                    <Button text='Create' onPress={handleSubmitTransaction} />

                </View>

                <Modal
                    visible={showStockPicker}
                    onDismiss={() => setShowStockPicker(false)}
                    contentContainerStyle={styles.modalContainer}
                >
                    <StockPicker {...{ ticker, setTicker, setShowStockPicker }} />
                </Modal>

            </KeyboardView>
        </Provider >
    )
}

export default NewTransaction

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    headerContainer: {
        alignItems: 'flex-start'
    },

    closeButton: {
        marginRight: 24,
        marginTop: 24
    },

    mainContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 8,
        paddingHorizontal: 8,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 32
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

    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})
