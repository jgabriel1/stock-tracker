import React, { useState, useContext, useCallback } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { Switch } from 'react-native-switch'

import Modal, { ModalProvider } from '../../components/Modal'
import StockPicker from './components/StockPicker'
import Button from '../../components/Button'
import ReturnButton from '../../components/ReturnButton'
import KeyboardView from '../../components/KeyboardView'

import API from '../../services/api'
import * as Yahoo from '../../services/yahooFinance/stockInfo'
import DataContext from '../../store/dataContext'

import { AppStackParamList } from '../../routes'


const NewTransaction = () => {
    const route = useRoute<RouteProp<AppStackParamList, 'NewTransaction'>>()
    const { initialTicker, initialTransactionType } = route.params

    const [transactionType, setTransactionType] = useState<'IN' | 'OUT'>(initialTransactionType || 'IN')

    const [ticker, setTicker] = useState(initialTicker || '')
    const [quantity, setQuantity] = useState('')
    const [totalValue, setTotalValue] = useState('')

    const [showStockPicker, setShowStockPicker] = useState(false)

    const { dispatch } = useContext(DataContext)

    const navigation = useNavigation()

    function toggleTransactionType(current: 'IN' | 'OUT'): 'IN' | 'OUT' {
        const possibilities = ['IN', 'OUT']
        const reversed = possibilities.filter(value => value !== current)[0]

        return reversed as 'IN' | 'OUT'
    }

    async function handleSubmitTransaction() {
        const data = {
            ticker,
            quantity: (transactionType === 'OUT' ? -1 : 1) * Number(quantity),
            total_value: (transactionType === 'OUT' ? -1 : 1) * Number(totalValue),
        }

        await API.postNewTransaction(data)

        const stocks = await API.getStocksData()
        dispatch({ type: 'SET_STOCKS', payload: stocks })

        navigation.navigate('Dashboard')

        const tickers = Array.from(stocks.keys())
        const yahooStocks = await Yahoo.getStockInfo(tickers)
        dispatch({ type: 'SET_YAHOO', payload: yahooStocks })
    }

    return (
        <ModalProvider>
            <KeyboardView style={styles.container}>

                <ReturnButton />

                <View style={styles.mainContent}>
                    <Text style={styles.title}>New Transaction</Text>

                    <View style={{ marginBottom: 16 }}>
                        <Switch
                            value={transactionType === 'IN'}
                            onValueChange={() => setTransactionType(toggleTransactionType)}
                            activeText={'In'}
                            activeTextStyle={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}
                            backgroundActive={'#fff'}
                            inActiveText={'Out'}
                            inactiveTextStyle={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}
                            backgroundInactive={'#000'}
                            circleSize={50}
                            switchRightPx={2}
                            switchWidthMultiplier={2.5}
                        />
                    </View>

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

                <Modal visible={showStockPicker} onDismiss={() => setShowStockPicker(false)}>
                    <StockPicker {...{ ticker, setTicker, setShowStockPicker }} />
                </Modal>
            </KeyboardView>
        </ModalProvider>
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
})
