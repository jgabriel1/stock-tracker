import React, { useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import DataContext from '../../store/dataContext'
import { getAllStocksData } from '../../store/selectors'

import NewTransactionButton from './components/NewTransactionButton'

const StockList = () => {
    const { state } = useContext(DataContext)
    const stocksList = getAllStocksData(state)

    const navigation = useNavigation()

    function navigateToDetail(ticker: string): void {
        navigation.navigate('Detail', { ticker })
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={stocksList}
                keyExtractor={item => item.ticker}
                renderItem={({ item: stock }) => {
                    const { ticker, currently_owned_shares, average_bought_price } = stock

                    const regularMarketPrice = stock.regularMarketPrice
                    const potentialProfit = regularMarketPrice
                        ? (regularMarketPrice - average_bought_price) * currently_owned_shares
                        : 0

                    return (
                        <TouchableOpacity onPress={() => navigateToDetail(ticker)}>
                            <View style={styles.tickerContainer}>
                                <Text style={styles.tickerText}>{ticker}</Text>
                            </View>

                            <View style={styles.gridRow}>

                                <View style={styles.gridColumn}>
                                    <Text>x{currently_owned_shares}</Text>
                                </View>

                                <View style={styles.gridColumn}>
                                    <Text>{average_bought_price.toFixed(2)}</Text>
                                </View>

                                {
                                    regularMarketPrice
                                        ? <>
                                            <View style={styles.gridColumn}>
                                                <Text>{regularMarketPrice.toFixed(2)}</Text>
                                            </View>
                                            <View style={styles.gridColumn}>
                                                <Text style={[
                                                    potentialProfit > 0
                                                        ? styles.greenText
                                                        : styles.redText
                                                ]}>
                                                    {potentialProfit.toFixed(2)}
                                                </Text>
                                            </View>
                                        </>

                                        : <>
                                            <View style={styles.gridColumn}>
                                                <Text>-</Text>
                                            </View>
                                            <View style={styles.gridColumn}>
                                                <Text>-</Text>
                                            </View>
                                        </>
                                }

                            </View>
                        </TouchableOpacity>
                    )
                }}
                scrollEnabled={true}
            />
            <NewTransactionButton />
        </SafeAreaView>
    )
}

export default StockList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },

    gridRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderColor: '#999',
        paddingVertical: 16,
        borderBottomWidth: 1,
        width: Dimensions.get('window').width,
    },

    gridColumn: {
        height: '100%',
        width: Dimensions.get('window').width / 4,
        alignItems: 'center',
    },

    tickerContainer: {
        paddingLeft: 32,
        paddingTop: 16
    },

    tickerText: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    redText: {
        color: '#d00',
    },

    greenText: {
        color: '#0a0'
    },
})
