import React, { useEffect, useState, useContext, useMemo } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { AppLoading } from 'expo'

import ReturnButton from '../../components/ReturnButton'

import API from '../../services/api'
import { Transaction, Stock } from '../../services/api/types'
import DataContext from '../../store/dataContext'

import { AppStackParamList } from '../../routes'
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler'
import { Feather as Icon } from '@expo/vector-icons'
import { YahooStock } from '../../services/yahooFinance/stockInfo'


const Detail = () => {
    const route = useRoute<RouteProp<AppStackParamList, 'Detail'>>()
    const { ticker } = route.params

    const [transactionList, setTransactionList] = useState<Transaction[]>([])

    const { state } = useContext(DataContext)
    const { stocksData, isStocksDataReady, yahooData, isYahooDataReady } = state

    const { currently_owned_shares, average_bought_price } = stocksData.get(ticker) as Stock
    const { regularMarketPrice } = yahooData.get(ticker) as YahooStock

    const { totalInvested, currentWorth, balance, variation } = useMemo(() => ({
        totalInvested: currently_owned_shares * average_bought_price,
        currentWorth: currently_owned_shares * regularMarketPrice,
        balance: currently_owned_shares * (regularMarketPrice - average_bought_price),
        variation: 100 * (regularMarketPrice / average_bought_price - 1),
    }), [currently_owned_shares, average_bought_price, regularMarketPrice])

    useEffect(() => {
        API.getTransactionsFor(ticker).then(setTransactionList)
    }, [])

    async function handleSellStock() { }

    if (!isStocksDataReady || !isYahooDataReady) {
        return <AppLoading />
    }

    return (
        <SafeAreaView style={styles.generalContainer}>

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
                        containerStyle={styles.button}
                    >
                        <Icon name='plus' size={32} color='#eee' />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => console.log('sell')}
                        containerStyle={styles.button}
                    >
                        <Icon name='minus' size={32} color='#eee' />
                    </TouchableOpacity>
                </View>

                <FlatList
                    style={{ width: '100%' }}
                    data={transactionList}
                    stickyHeaderIndices={[0]}
                    showsVerticalScrollIndicator={false}
                    alwaysBounceVertical={false}
                    ListHeaderComponent={() => (
                        <View style={styles.transactionRow}>
                            <View style={styles.transactionColumn}>
                                <Text>Quantity</Text>
                            </View>

                            <View style={styles.transactionColumn}>
                                <Text>Avg. Price</Text>
                            </View>

                            <View style={styles.transactionColumn}>
                                <Text>Total</Text>
                            </View>

                            <View style={styles.transactionColumn}>
                                <Text>Date</Text>
                            </View>
                        </View>
                    )}
                    renderItem={({ item }: { item: Transaction }) => {
                        const date = new Date((item.timestamp as number) * 1000)

                        return (
                            <View style={styles.transactionRow} key={item.timestamp}>
                                <View style={styles.transactionColumn}>
                                    <Text>x{item.quantity}</Text>
                                </View>

                                <View style={styles.transactionColumn}>
                                    <Text>$ {item.average_price?.toFixed(2)}</Text>
                                </View>

                                <View style={styles.transactionColumn}>
                                    <Text>$ {item.total_value.toFixed(2)}</Text>
                                </View>

                                <View style={styles.transactionColumn}>
                                    <Text>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</Text>
                                </View>
                            </View>
                        )
                    }}
                />

            </View>
        </SafeAreaView>
    )
}

export default Detail

const styles = StyleSheet.create({
    generalContainer: {
        flex: 1,
        justifyContent: 'center',
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
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
        marginBottom: 8,
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

    transactionRow: {
        width: '100%',
        padding: 16,
        backgroundColor: '#f4f4f4',
        borderColor: '#222',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    transactionColumn: {
        height: '100%',
        width: Dimensions.get('window').width / 4,
        alignItems: 'center',
    },
})
