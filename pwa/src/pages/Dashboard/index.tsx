import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from 'react-native'
import { AppLoading } from 'expo'
import { useNavigation } from '@react-navigation/native'

import StockList from './components/StockList'

import api from '../../services/api'
import { getStockInfo, YahooStock } from '../../services/yahooFinance/stockInfo'
import { getAuthToken } from '../../utils/tokenHandler'

export interface StockInfo {
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

            <StockList {...{ stocks, yahooInfo, navigation }} />

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
})
