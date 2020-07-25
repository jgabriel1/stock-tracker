import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { AppLoading } from 'expo'

import ReturnButton from '../../components/ReturnButton'

import API from '../../services/api'
import { Transaction, Stock } from '../../services/api/types'
import DataContext from '../../store/dataContext'

import { AppStackParamList } from '../../routes'
import { Provider } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Feather as Icon } from '@expo/vector-icons'
import { YahooStock } from '../../services/yahooFinance/stockInfo'


const Detail = () => {
    const route = useRoute<RouteProp<AppStackParamList, 'Detail'>>()
    const { ticker } = route.params

    const [transactionList, setTransactionList] = useState<Transaction[]>([])

    const { state, dispatch } = useContext(DataContext)
    const { stocksData, isStocksDataReady, yahooData, isYahooDataReady } = state

    const { currently_owned_shares, average_bought_price } = stocksData.get(ticker) as Stock
    const { regularMarketPrice } = yahooData.get(ticker) as YahooStock

    const totalInvested = currently_owned_shares * average_bought_price
    const currentWorth = currently_owned_shares * regularMarketPrice
    const balance = currentWorth - totalInvested
    const variation = 100 * (regularMarketPrice / average_bought_price - 1)

    useEffect(() => {
        API.getTransactionsFor(ticker).then(setTransactionList)
    }, [])

    async function handleSellStock() { }

    if (!isStocksDataReady || !isYahooDataReady) {
        return <AppLoading />
    }

    return (
        <Provider>
            <SafeAreaView style={{ flex: 1 }}>

                <ReturnButton />

                <View style={styles.container}>

                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{ticker}</Text>
                    </View>

                    <View style={styles.infoContainer}>
                        <View style={styles.infoRow}>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoItemTitle}>Total Invested:</Text>
                                <Text style={styles.infoItemValue}>{`$ ${totalInvested.toFixed(2)}`}</Text>
                            </View>

                            <View style={styles.infoItem}>
                                <Text style={styles.infoItemTitle}>Current Worth:</Text>
                                <Text style={styles.infoItemValue}>{`$ ${currentWorth.toFixed(2)}`}</Text>
                            </View>
                        </View>

                        <View style={styles.infoRow}>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoItemTitle}>Balance:</Text>
                                <Text style={styles.infoItemValue}>{`$ ${balance.toFixed(2)}`}</Text>
                            </View>

                            <View style={styles.infoItem}>
                                <Text style={styles.infoItemTitle}>Variation(%):</Text>
                                <Text style={styles.infoItemValue}>{`${variation.toFixed(2)} %`}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            onPress={() => console.log('buy')}
                            containerStyle={{ ...styles.button, marginRight: 4 }}
                        >
                            <Icon name='plus' size={32} color='#eee' />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => console.log('sell')}
                            containerStyle={{ ...styles.button, marginLeft: 4 }}
                        >
                            <Icon name='minus' size={32} color='#eee' />
                        </TouchableOpacity>
                    </View>

                    {transactionList.map((transaction, index) => (
                        <View style={styles.transactionContainer} key={index}>
                            <Text>{transaction.quantity}</Text>
                            <Text>{transaction.average_price}</Text>
                            <Text>{transaction.total_value}</Text>
                            <Text>{new Date((transaction.timestamp as number) * 1000).toISOString()}</Text>
                        </View>
                    ))}

                </View>
            </SafeAreaView>
        </Provider>
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
        width: '80%',
        marginBottom: 16,
    },

    title: {
        fontSize: 32,
        fontWeight: 'bold',
    },

    infoContainer: {
        width: '100%',
        marginBottom: 8,
        paddingHorizontal: 8,
    },

    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8
    },

    infoItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderRadius: 4,
        borderColor: '#999',
        paddingVertical: 8,
        paddingHorizontal: 4,
        marginHorizontal: 4,
    },

    infoItemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 4,
    },

    infoItemValue: {
        fontSize: 16,
    },

    buttonsContainer: {
        flexDirection: 'row',
        width: '80%',
    },

    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        borderRadius: 4,
        marginBottom: 16,
        backgroundColor: '#999',
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
