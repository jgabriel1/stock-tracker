import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'

import { StockInfo } from '..'
import { YahooStock } from '../../../services/yahooFinance/stockInfo'

interface Props {
    totalInvested: number
    stocks: Map<string, StockInfo>
    yahooInfo: Map<string, YahooStock>
}

const MainInfo = ({ totalInvested, stocks, yahooInfo }: Props) => {
    const [currentWorth, setCurrentWorth] = useState(0)

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
