import React, { useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, Platform } from 'react-native'
import { AppLoading } from 'expo'
import { useNavigation, useIsFocused, useRoute, RouteProp } from '@react-navigation/native'
import { Feather as Icon } from '@expo/vector-icons'
import ActionButton from 'react-native-action-button'

import MainInfo from './components/MainInfo'
import StockList from './components/StockList'

import api from '../../services/api'
import { getStockInfo, YahooStock } from '../../services/yahooFinance/stockInfo'
import { getAuthToken } from '../../utils/tokenHandler'

import { AppStackParamList } from '../../routes'

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

    const [dataReady, setDataReady] = useState<boolean>(false)
    const [yahooDataReady, setYahooDataReady] = useState<boolean>(false)

    const navigation = useNavigation()
    const isFocused = useIsFocused()
    const route = useRoute<RouteProp<AppStackParamList, 'Dashboard'>>()

    useEffect(() => {
        async function fetchBackendData() {
            const token = await getAuthToken()
            const headers = { Authorization: `Bearer ${token}` }

            try {
                const response = await api.get('stocks', { headers })

                const { stocks, total_applied } = response.data

                setStocks(new Map(Object.entries(stocks)))
                setTotalInvested(total_applied)
            }
            catch (error) {
                alert(error)
            }
        }

        const { loadData } = route.params

        if (isFocused && loadData) {
            fetchBackendData()
                .then(() => {
                    setDataReady(true)
                    setYahooDataReady(false)

                    route.params.loadData = false
                })
        }
    }, [isFocused])

    useEffect(() => {
        async function fetchYahooData(tickers: string[]) {
            try {
                const stocksYahooInfo = await getStockInfo(tickers)
                setYahooInfo(stocksYahooInfo)
                setYahooDataReady(true)
            } catch (error) {
                alert(error)
            }
        }

        if (dataReady) {
            const tickers = Array.from(stocks.keys())

            // when rendering the screen for the first time, execute it immediately
            if (!yahooDataReady) {
                setTimeout(async () => {
                    await fetchYahooData(tickers)
                }, 1)
            }

            const interval = setInterval(async () => {
                await fetchYahooData(tickers)
            }, 5000 * 60)

            return () => clearInterval(interval)
        }
    }, [dataReady, yahooDataReady])

    if (!dataReady || !yahooDataReady) {
        return <AppLoading />
    }

    return (
        <SafeAreaView style={styles.mainContainer}>

            <MainInfo {...{ totalInvested, stocks, yahooInfo }} />

            <StockList {...{ stocks, yahooInfo, navigation }} />

            <ActionButton
                onPress={() => navigation.navigate('NewTransaction')}
                renderIcon={() => <Icon name='plus' size={32} color='#fff' />}
                buttonColor='rgba(0, 0, 0, 0.8)'
                hideShadow={Platform.OS === 'web' ? true : false}
            />

        </SafeAreaView>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
})
