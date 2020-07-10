import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
    Dimensions
} from 'react-native'

import { AppLoading } from 'expo'
import { useNavigation } from '@react-navigation/native'

import { getAuthToken } from '../../utils/tokenHandler'
import api from '../../services/api'
import { getStockInfo, YahooStock } from '../../services/yahooFinance/stockInfo'

interface StockInfo {
    ticker: string
    total_invested: number
    average_bought_price: number
    total_sold: number
    currently_owned_shares: number
}

const Dashboard = () => {
    const [stocks, setStocks] = useState<StockInfo[]>([])
    const [totalInvested, setTotalInvested] = useState(0)

    const [yahooInfo, setYahooInfo] = useState<YahooStock[]>([])
    const [currentWorth, setCurrentWorth] = useState(0)

    const [dataReady, setDataReady] = useState<boolean>(false)

    const navigation = useNavigation()

    useEffect(() => {
        async function fetchBackendData(): Promise<string[]> {
            const token = await getAuthToken()
            const headers = { Authorization: `Bearer ${token}` }

            try {
                const response = await api.get('stocks', { headers })

                const { stocks, total_applied } = response.data

                setStocks(stocks)
                setTotalInvested(total_applied)

                return stocks.map((stock: StockInfo) => stock.ticker)
            }
            catch (error) {
                alert(error)
                return []
            }
        }

        async function fetchYahooData(tickers: string[]) {
            try {
                const stocksYahooInfo = await getStockInfo(tickers)
                setYahooInfo(stocksYahooInfo)
            } catch (error) {
                alert(error)
            }
        }

        fetchBackendData().then(tickers => {
            fetchYahooData(tickers).then(() => setDataReady(true))
        })
    }, [])

    useEffect(() => {
        const current = calculateCurrentWorth(stocks, yahooInfo)
        setCurrentWorth(current)
    }, [])

    function calculateCurrentWorth(stocks: StockInfo[], yahooStocks: YahooStock[]): number {
        const merged = stocks.map(stock => {
            for (let yahooStock of yahooStocks) {
                if (yahooStock.symbol === stock.ticker) {
                    return { ...yahooStock, ...stock }
                }
            }
        })

        return merged.reduce((accum, current: any) => (accum + (current.currently_owned_shares * current.regularMarketPrice)), 0)
    }

    function navigateToDetail(item: StockInfo) {
        navigation.navigate('Detail', {
            ticker: item.ticker
        })
    }

    if (!dataReady) {
        return <AppLoading />
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.headerContainer}>
                <View style={styles.infoContainer}>
                    <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Total Invested</Text>
                    <Text style={{ fontSize: 18 }}>$ {totalInvested.toFixed(2)}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Current Worth</Text>
                    <Text style={{ fontSize: 18 }}>$ {calculateCurrentWorth(stocks, yahooInfo).toFixed(2)}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Balance</Text>
                    <Text style={{ fontSize: 18 }}>$ {(currentWorth - totalInvested).toFixed(2)}</Text>
                </View>
            </View>
            <FlatList
                data={stocks}
                keyExtractor={item => item.ticker}
                renderItem={({ item }: { item: StockInfo }) => (
                    <TouchableOpacity onPress={() => navigateToDetail(item)}>
                        <View style={styles.gridRow}>
                            <Text style={{ fontSize: 18 }}>{item.ticker}</Text>
                            <Text>{item.currently_owned_shares}</Text>
                            <Text>{item.average_bought_price}</Text>
                            <Text>{item.total_invested}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.listContainer}
            />
        </SafeAreaView>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    headerContainer: {
        flex: 0.8,
    },

    infoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 32,
    },

    listContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    gridRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderColor: '#999',
        paddingVertical: 16,
        borderBottomWidth: 1,
        width: Dimensions.get('window').width, // probably changing this
    }
})
