import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import { NavigationProp } from '@react-navigation/native'

import { StockInfo } from '..'
import { YahooStock } from '../../../services/yahooFinance/stockInfo'


interface Props {
    stocks: Map<string, StockInfo>
    yahooInfo: Map<string, YahooStock>
    navigation: NavigationProp<any>
}

const StockList = ({ stocks, yahooInfo, navigation }: Props) => {
    const stocksList = Array.from(stocks.values())

    function navigateToDetail(item: StockInfo): void {
        navigation.navigate('Detail', {
            ticker: item.ticker
        })
    }

    return (
        <FlatList
            data={stocksList}
            keyExtractor={item => item.ticker}
            renderItem={({ item }: { item: StockInfo }) => {
                const { ticker, currently_owned_shares, average_bought_price } = item

                const { regularMarketPrice } = yahooInfo.get(ticker) as YahooStock

                const potentialProfit = (regularMarketPrice - average_bought_price) * currently_owned_shares
                const profitColor = potentialProfit > 0 ? '#0a0' : '#d00'

                return (
                    <TouchableOpacity onPress={() => navigateToDetail(item)}>
                        <View style={styles.tickerContainer}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{ticker}</Text>
                        </View>
                        <View style={styles.gridRow}>
                            <View style={styles.gridColumn}><Text>x{currently_owned_shares}</Text></View>
                            <View style={styles.gridColumn}><Text>{average_bought_price.toFixed(2)}</Text></View>
                            <View style={styles.gridColumn}><Text>{regularMarketPrice.toFixed(2)}</Text></View>
                            <View style={styles.gridColumn}><Text style={{ color: profitColor }}>{potentialProfit.toFixed(2)}</Text></View>
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
