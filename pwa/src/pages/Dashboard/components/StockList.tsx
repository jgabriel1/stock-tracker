import React, { useContext, useMemo } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Stock } from '../../../services/api/types'
import { YahooStock } from '../../../services/yahooFinance/stockInfo'
import DataContext from '../../../store/dataContext'


const StockList = () => {
    const { state } = useContext(DataContext)
    const { stocksData, yahooData, isYahooDataReady } = state

    const navigation = useNavigation()

    const stocksList = Array.from(stocksData.values())

    function navigateToDetail(item: Stock): void {
        navigation.navigate('Detail', { ticker: item.ticker })
    }

    return (
        <FlatList
            data={stocksList}
            keyExtractor={item => item.ticker}
            renderItem={({ item }: { item: Stock }) => {
                const { ticker, currently_owned_shares, average_bought_price } = item

                return (
                    <TouchableOpacity onPress={() => navigateToDetail(item)}>
                        <View style={styles.tickerContainer}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{ticker}</Text>
                        </View>

                        <View style={styles.gridRow}>

                            <View style={styles.gridColumn}>
                                <Text>x{currently_owned_shares}</Text>
                            </View>

                            <View style={styles.gridColumn}>
                                <Text>{average_bought_price.toFixed(2)}</Text>
                            </View>

                            {useMemo(() => {
                                if (!isYahooDataReady) {
                                    return (
                                        <>
                                            <View style={styles.gridColumn}>
                                                <Text>-</Text>
                                            </View>
                                            <View style={styles.gridColumn}>
                                                <Text>-</Text>
                                            </View>
                                        </>
                                    )
                                }

                                const { regularMarketPrice } = yahooData.get(ticker) as YahooStock

                                const potentialProfit = (regularMarketPrice - average_bought_price) * currently_owned_shares
                                const profitColor = potentialProfit > 0 ? '#0a0' : '#d00'

                                return (
                                    <>
                                        <View style={styles.gridColumn}>
                                            <Text>{regularMarketPrice.toFixed(2)}</Text>
                                        </View>
                                        <View style={styles.gridColumn}>
                                            <Text style={{ color: profitColor }}>{potentialProfit.toFixed(2)}</Text>
                                        </View>
                                    </>
                                )
                            }, [isYahooDataReady, yahooData, ticker])}

                        </View>
                    </TouchableOpacity>
                )
            }}
            scrollEnabled={true}
        />
    )
}

export default StockList

const styles = StyleSheet.create({
    gridRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderColor: '#999',
        paddingVertical: 16,
        borderBottomWidth: 1,
        width: Dimensions.get('window').width, // probably changing this
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
})
