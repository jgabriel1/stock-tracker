import React, { useContext } from 'react'
import { StyleSheet, SafeAreaView, Platform, View, Text } from 'react-native'
import { AppLoading } from 'expo'
import { useNavigation } from '@react-navigation/native'
import { Feather as Icon } from '@expo/vector-icons'
import ActionButton from 'react-native-action-button'

import MainInfo from './components/MainInfo'
import StockList from './components/StockList'

import * as Yahoo from '../../services/yahooFinance/stockInfo'

import DataContext from '../../store/dataContext'
import { DataStateContext } from '../../store/types'

import usePeriodicEffect from '../../hooks/usePeriodicEffect'


const Dashboard = () => {
    const navigation = useNavigation()

    const { state, dispatch } = useContext<DataStateContext>(DataContext)
    const { stocksData, isStocksDataReady, yahooData, isYahooDataReady } = state

    usePeriodicEffect(() => {
        if (isStocksDataReady) {
            const tickers = Array.from(stocksData.keys())

            Yahoo.getStockInfo(tickers)
                .then(yahoo => {
                    dispatch({ type: 'SET_YAHOO', payload: yahoo })
                })
        }
    }, [isStocksDataReady, isYahooDataReady, stocksData], 30 * 1000, false)

    if (!isStocksDataReady || !isYahooDataReady) {
        return <AppLoading />
    }

    return (
        <SafeAreaView style={styles.mainContainer}>

            {
                (yahooData.size === stocksData.size) ?
                    <>
                        <MainInfo {...{ stocksData, yahooData }} />

                        <StockList {...{ stocksData, yahooData }} />
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
