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
    const [stocks, setStocks] = useState<Map<string, StockInfo>>(new Map())
    const [totalInvested, setTotalInvested] = useState(0)

    const [yahooInfo, setYahooInfo] = useState<Map<string, YahooStock>>(new Map())
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

                setStocks(new Map(Object.entries(stocks)))
                setTotalInvested(total_applied)

                return Object.keys(stocks)
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
        function calculateCurrentWorth(
            stocks: Map<string, StockInfo>,
            yahooStocks: Map<string, YahooStock>
        ): number {
            const tickers = stocks.keys()

            const currentPrices = Array.from(tickers).map(ticker => {
                const { currently_owned_shares } = stocks.get(ticker) as StockInfo
                const { regularMarketPrice } = yahooStocks.get(ticker) as YahooStock

                return regularMarketPrice * currently_owned_shares
            })

            // Sum of all the values
            return currentPrices.reduce((a, b) => (a + b))
        }

        if (stocks.size !== 0) {
            const current = calculateCurrentWorth(stocks, yahooInfo)
            setCurrentWorth(current)
        }
    }, [yahooInfo])


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
                    <Text style={{ fontSize: 18 }}>$ {currentWorth.toFixed(2)}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Balance</Text>
                    <Text style={{ fontSize: 18 }}>$ {(currentWorth - totalInvested).toFixed(2)}</Text>
                </View>
            </View>

            <FlatList
                data={Array.from(stocks.values())}
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
                contentContainerStyle={styles.listContainer}
                scrollEnabled={true}
            />

        </SafeAreaView>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    headerContainer: {
        height: Dimensions.get('window').height * 0.4
    },

    infoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 32,
    },

    listContainer: {},

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
