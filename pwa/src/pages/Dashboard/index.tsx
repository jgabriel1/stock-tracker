import React, { useState, useCallback, useContext } from 'react'
import { StyleSheet, SafeAreaView, Platform, View, Text } from 'react-native'
import { AppLoading } from 'expo'
import { useNavigation, useFocusEffect, useRoute, RouteProp } from '@react-navigation/native'
import { Feather as Icon } from '@expo/vector-icons'
import ActionButton from 'react-native-action-button'

import MainInfo from './components/MainInfo'
import StockList from './components/StockList'

import API from '../../services/api'
import { Stock } from '../../services/api/types'
import { getStockInfo } from '../../services/yahooFinance/stockInfo'

import { AppStackParamList } from '../../routes'

import DataContext from '../../store/dataContext'
import { DataStateContext } from '../../store/types'

import usePeriodicEffect from '../../hooks/usePeriodicEffect'


const Dashboard = () => {
    const navigation = useNavigation()
    const { params: routeParams } = useRoute<RouteProp<AppStackParamList, 'Dashboard'>>()

    const { state, dispatch } = useContext<DataStateContext>(DataContext)
    const { stocksData, isStocksDataReady, yahooData, isYahooDataReady } = state

    const [totalInvested, setTotalInvested] = useState(0)

    const calculateTotalInvested = useCallback((stocks: Map<string, Stock>): number => {
        const stocksValues = Array.from(stocks.values())

        const total = stocksValues.reduce((accum, stock) => {
            const { average_bought_price, currently_owned_shares } = stock

            return accum + average_bought_price * currently_owned_shares
        }, 0)

        return total
    }, [])

    useFocusEffect(
        useCallback(() => {
            const { loadData } = routeParams

            if (loadData) {
                API.getStocksData()
                    .then(stocks => {
                        dispatch({ type: 'SET_STOCKS', payload: stocks })

                        setTotalInvested(calculateTotalInvested(stocks))
                    })
                    .then(() => {
                        routeParams.loadData = false
                    })
            }
        }, [routeParams])
    )

    usePeriodicEffect(() => {
        if (isStocksDataReady) {
            const tickers = Array.from(stocksData.keys())

            getStockInfo(tickers)
                .then(yahoo => {
                    dispatch({ type: 'SET_YAHOO', payload: yahoo })
                })
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
