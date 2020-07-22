import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'

import { Stock } from '../../../services/api/types'
import { YahooStock } from '../../../services/yahooFinance/stockInfo'

interface Props {
    stocksData: Map<string, Stock>
    yahooData: Map<string, YahooStock>
}

const MainInfo: React.FC<Props> = ({ stocksData, yahooData }) => {
    const [currentWorth, setCurrentWorth] = useState(0)
    const [totalInvested, setTotalInvested] = useState(0)

    const calculateTotalInvested = useCallback(
        (stocks: Map<string, Stock>): number => {
            const stocksValues = Array.from(stocks.values())

            const total = stocksValues.reduce((accum, stock) => {
                const { average_bought_price, currently_owned_shares } = stock

                return accum + average_bought_price * currently_owned_shares
            }, 0)

            return total
        }, []
    )

    const calculateCurrentWorth = useCallback(
        (stocks: Map<string, Stock>, yahooStocks: Map<string, YahooStock>): number => {
            const tickers = stocks.keys()

            const currentPrices = Array.from(tickers).map(ticker => {
                const { currently_owned_shares } = stocks.get(ticker) as Stock
                const { regularMarketPrice } = yahooStocks.get(ticker) as YahooStock

                return regularMarketPrice * currently_owned_shares
            })

            // Sum of all the values
            return currentPrices.reduce((a, b) => (a + b))
        }, []
    )

    useEffect(() => {
        setTotalInvested(() => calculateTotalInvested(stocksData))
    }, [stocksData])

    useEffect(() => {
        if (stocksData.size !== 0) {
            const current = calculateCurrentWorth(stocksData, yahooData)
            setCurrentWorth(current)
        }
    }, [yahooData])

    return (
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
