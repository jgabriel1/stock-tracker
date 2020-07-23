import React, { useContext, useMemo } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'

import { Stock } from '../../../services/api/types'
import { YahooStock } from '../../../services/yahooFinance/stockInfo'

import DataContext from '../../../store/dataContext'


const MainInfo = () => {
    const { state } = useContext(DataContext)
    const { stocksData, yahooData, isYahooDataReady } = state

    const totalInvested = useMemo(() => {
        const stocksValues = Array.from(stocksData.values())

        return stocksValues.reduce((accum, stock) => {
            const { average_bought_price, currently_owned_shares } = stock

            return accum + average_bought_price * currently_owned_shares
        }, 0)
    }, [stocksData])

    const currentWorth = useMemo(() => {
        if (isYahooDataReady) {
            const tickers = Array.from(stocksData.keys())

            return tickers.reduce((accum, ticker) => {
                const { currently_owned_shares } = stocksData.get(ticker) as Stock
                const { regularMarketPrice } = yahooData.get(ticker) as YahooStock

                return accum + regularMarketPrice * currently_owned_shares
            }, 0)
        }

        return null
    }, [isYahooDataReady, stocksData, yahooData])

    return (
        <View style={styles.headerContainer}>

            <View style={styles.infoContainer}>
                <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Total Invested</Text>
                <Text style={{ fontSize: 18 }}>$ {totalInvested.toFixed(2)}</Text>
            </View>

            <View style={styles.infoContainer}>
                <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Current Worth</Text>
                {
                    currentWorth !== null ?
                        <Text style={{ fontSize: 18 }}>$ {currentWorth.toFixed(2)}</Text>
                        :
                        <Text style={{ fontSize: 18 }}>$ -</Text>
                }
            </View>

            <View style={styles.infoContainer}>
                <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Balance</Text>
                {
                    currentWorth !== null ?
                        <Text style={{ fontSize: 18 }}>$ {(currentWorth - totalInvested).toFixed(2)}</Text>
                        :
                        <Text style={{ fontSize: 18 }}>$ -</Text>
                }
            </View>

        </View>
    )
}

export default MainInfo

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
