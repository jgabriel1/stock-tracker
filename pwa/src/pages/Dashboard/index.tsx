import React, { useState, useCallback, useContext } from 'react'
import { StyleSheet, SafeAreaView, Platform, View, Text } from 'react-native'
import { AppLoading } from 'expo'
import { useNavigation, useFocusEffect, useRoute, RouteProp } from '@react-navigation/native'
import { Feather as Icon } from '@expo/vector-icons'
import ActionButton from 'react-native-action-button'

import MainInfo from './components/MainInfo'
import StockList from './components/StockList'

import api from '../../services/api'
import { getStockInfo } from '../../services/yahooFinance/stockInfo'
import { getAuthToken } from '../../utils/tokenHandler'

import { AppStackParamList } from '../../routes'
import usePeriodicEffect from '../../hooks/usePeriodicEffect'
import DataContext from '../../store/dataContext'
import { DataStateContext } from '../../store/types'


export interface StockInfo {
    ticker: string
    total_invested: number
    average_bought_price: number
    total_sold: number
    currently_owned_shares: number
}

const Dashboard = () => {
    const [totalInvested, setTotalInvested] = useState(0)

    const navigation = useNavigation()
    const { params: routeParams } = useRoute<RouteProp<AppStackParamList, 'Dashboard'>>()

    const { state, dispatch } = useContext<DataStateContext>(DataContext)
    const { stocksData, isStocksDataReady, yahooData, isYahooDataReady } = state

    useFocusEffect(
        useCallback(() => {
            async function fetchBackendData() {
                const token = await getAuthToken()
                const headers = { Authorization: `Bearer ${token}` }

                try {
                    const response = await api.get('stocks', { headers })

                    const { stocks, total_applied } = response.data

                    dispatch({
                        type: 'SET_STOCKS',
                        payload: new Map(Object.entries(stocks))
                    })

                    setTotalInvested(total_applied)
                }
                catch (error) {
                    alert(error)
                }
            }

            const { loadData } = routeParams

            if (loadData) {
                fetchBackendData()
                    .then(() => {
                        routeParams.loadData = false
                    })
            }
        }, [routeParams])
    )

    usePeriodicEffect(() => {
        async function fetchYahooData(tickers: string[]) {
            try {
                const stocksYahooInfo = await getStockInfo(tickers)

                dispatch({
                    type: 'SET_YAHOO',
                    payload: stocksYahooInfo
                })
            }
            catch (error) {
                alert(error)
            }
        }

        if (isStocksDataReady) {
            const tickers = Array.from(stocksData.keys())

            fetchYahooData(tickers)
        }
    }, [isStocksDataReady, isYahooDataReady, stocksData], 30 * 1000)

    if (!isStocksDataReady || !isYahooDataReady) {
        return <AppLoading />
    }

    return (
        <SafeAreaView style={styles.mainContainer}>

            {
                (yahooData.size === stocksData.size) ?
                    <>
                        <MainInfo
                            totalInvested={totalInvested}
                            stocks={stocksData}
                            yahooInfo={yahooData}
                        />

                        <StockList
                            stocks={stocksData}
                            yahooInfo={yahooData}
                            navigation={navigation}
                        />
                    </>
                    :
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>Loading Data</Text>
                    </View>
            }

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
