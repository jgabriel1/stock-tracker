import React, { useContext } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'

import usePeriodicEffect from '../../hooks/usePeriodicEffect'

import DataContext from '../../store/dataContext'
import { getTotalInvested, getCurrentWorth, getAllTickers } from '../../store/selectors'

import * as Yahoo from '../../services/yahooFinance/stockInfo'


const MainDashboard = () => {
    const { state, dispatch } = useContext(DataContext)

    const tickers = getAllTickers(state)
    const totalInvested = getTotalInvested(state)
    const currentWorth = getCurrentWorth(state)

    usePeriodicEffect(() => {
        if (state.isStocksDataReady) {
            Yahoo.getStockInfo(tickers)
                .then(yahoo => {
                    dispatch({ type: 'SET_YAHOO', payload: yahoo })
                })
        }
    }, [tickers, state.isStocksDataReady], 30 * 1000, false)

    return (
        <SafeAreaView style={styles.headerContainer}>

            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Total Invested</Text>
                <Text style={styles.infoData}>$ {totalInvested.toFixed(2)}</Text>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Current Worth</Text>
                {
                    currentWorth === 0
                        ? <Text style={styles.infoData}>$ -</Text>
                        : <Text style={styles.infoData}>$ {currentWorth.toFixed(2)}</Text>
                }
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Balance</Text>
                {
                    currentWorth === 0
                        ? <Text style={styles.infoData}>$ -</Text>
                        : <Text
                            style={[
                                styles.infoData,
                                currentWorth > totalInvested
                                    ? styles.greenText
                                    : styles.redText
                            ]}
                        >
                            $ {(currentWorth - totalInvested).toFixed(2)}
                        </Text>
                }
            </View>

        </SafeAreaView>
    )
}

export default MainDashboard

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        justifyContent: 'center'
    },

    infoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 32,
    },

    infoTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },

    infoData: {
        fontSize: 18,
    },

    redText: {
        color: '#d00',
    },

    greenText: {
        color: '#0a0'
    },
})
