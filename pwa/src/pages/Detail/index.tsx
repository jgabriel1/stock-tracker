import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { AppLoading } from 'expo'

import ReturnButton from '../../components/ReturnButton'

import API from '../../services/api'
import { Transaction } from '../../services/api/types'
import DataContext from '../../store/dataContext'

import { AppStackParamList } from '../../routes'


const Detail = () => {
    const route = useRoute<RouteProp<AppStackParamList, 'Detail'>>()
    const { ticker } = route.params

    const [transactionList, setTransactionList] = useState<Transaction[]>([])

    const { state, dispatch } = useContext(DataContext)
    const { stocksData, isStocksDataReady, yahooData, isYahooDataReady } = state

    useEffect(() => {
        API.getTransactionsFor(ticker)
            .then(setTransactionList)
    }, [])

    if (!isStocksDataReady || !isYahooDataReady) {
        return <AppLoading />
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <ReturnButton />

            <View style={styles.container}>

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{ticker}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text>{yahooData.get(ticker)?.symbol}</Text>
                    <Text>{yahooData.get(ticker)?.regularMarketPrice}</Text>
                    <Text>{yahooData.get(ticker)?.chartPreviousClose}</Text>
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
