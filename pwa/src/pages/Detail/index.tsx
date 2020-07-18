import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { AppLoading } from 'expo'

import ReturnButton from '../../components/ReturnButton'

import { getAuthToken } from '../../utils/tokenHandler'
import { getSingleStockInfo, YahooStock } from '../../services/yahooFinance/stockInfo'
import api from '../../services/api'

import { AppStackParamList } from '../../routes'


interface Transaction {
    ticker: string
    quantity: number
    total_value: number
    timestamp: number
    average_price: number
}

interface Stock {
    ticker: string
    total_invested: number
    total_sold: number
    currently_owned_shares: number
    average_bought_price: number
}

const Detail = () => {
    const route = useRoute<RouteProp<AppStackParamList, 'Detail'>>()
    const { ticker } = route.params

    const [yahooInfo, setYahooInfo] = useState({} as YahooStock)
    const [yahooInfoReady, setYahooInfoReady] = useState(false)

    const [transactionList, setTransactionList] = useState<Transaction[]>([])
    const [stock, setStock] = useState({} as Stock)
    const [backendInfoReady, setBackendInfoReady] = useState(false)

    useEffect(() => {
        async function fetchYahooData() {
            try {
                const stockInfo = await getSingleStockInfo(ticker)
                setYahooInfo(stockInfo)
            } catch (error) {
                alert(error)
            }
        }

        fetchYahooData().then(() => setYahooInfoReady(true))
    }, [])

    useEffect(() => {
        async function fetchBackendData() {
            const token = await getAuthToken()

            const params = { ticker }
            const headers = { Authorization: `Bearer ${token}` }

            try {
                const transactionsResponse = await api.get('transactions', { params, headers })
                const { transactions } = transactionsResponse.data
                setTransactionList(transactions)

                const stockResponse = await api.get(`stocks/${ticker}`, { headers })
                const stock = stockResponse.data
                setStock(stock)
            } catch (error) {
                alert(error)
            }
        }

        fetchBackendData().then(() => setBackendInfoReady(true))
    }, [])

    if (!yahooInfoReady || !backendInfoReady) {
        return <AppLoading />
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <ReturnButton />

            <View style={styles.container}>

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{stock.ticker}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text>{yahooInfo.symbol}</Text>
                    <Text>{yahooInfo.regularMarketPrice}</Text>
                    <Text>{yahooInfo.chartPreviousClose}</Text>
                </View>

                {transactionList.map((transaction, index) => (
                    <View style={styles.transactionContainer} key={index}>
                        <Text>{transaction.quantity}</Text>
                        <Text>{transaction.average_price}</Text>
                        <Text>{transaction.total_value}</Text>
                        <Text>{transaction.timestamp}</Text>
                    </View>
                ))}

            </View>
        </SafeAreaView>
    )
}

export default Detail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    titleContainer: {
        width: '80%'
    },

    title: {
        fontSize: 32,
        fontWeight: 'bold',
    },

    infoContainer: {
        width: '80%',

    },

    transactionContainer: {
        width: '100%',
        padding: 16,
        borderColor: '#222',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})
