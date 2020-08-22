import React, { useContext } from 'react'
import { Text, View, SafeAreaView } from 'react-native'

import usePeriodicEffect from '../../hooks/usePeriodicEffect'

import DataContext from '../../store/dataContext'
import {
    getTotalInvested,
    getCurrentWorth,
    getAllTickers
} from '../../store/selectors'

import * as Yahoo from '../../services/yahooFinance/stockInfo'

import styles from './styles'
import FourBoxGrid from '../../components/FourBoxGrid'
import { TouchableOpacity } from 'react-native-gesture-handler'


const MainDashboard = () => {
    const { state, dispatch } = useContext(DataContext)

    const tickers = getAllTickers(state)
    const totalInvested = getTotalInvested(state)
    const currentWorth = getCurrentWorth(state)

    usePeriodicEffect(() => {
        if (state.isStocksDataReady) {
            Yahoo.getStockInfo(tickers).then(yahoo => {
                dispatch({ type: 'SET_YAHOO', payload: yahoo })
            })
        }
    }, [tickers, state.isStocksDataReady], 30 * 1000, false)

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.chartContainer}>
                <Text>Chart goes here.</Text>
            </View>

            <FourBoxGrid
                nodes={[
                    <TouchableOpacity style={styles.infoContainer}>
                        <Text style={styles.infoTitle}>Total Invested</Text>
                        <Text style={styles.infoValue}>$ {totalInvested.toFixed(2)}</Text>
                    </TouchableOpacity>,

                    <TouchableOpacity style={styles.infoContainer}>
                        <Text style={styles.infoTitle}>Current Worth</Text>
                        <Text style={styles.infoValue}>$ {currentWorth.toFixed(2)}</Text>
                    </TouchableOpacity>,

                    <TouchableOpacity style={styles.infoContainer}>
                        <Text style={styles.infoTitle}>Balance</Text>
                        <Text style={styles.infoValue}>
                            $ <Text
                                style={
                                    currentWorth > totalInvested
                                        ? styles.greenText
                                        : styles.redText
                                }
                            >
                                {currentWorth && (currentWorth - totalInvested).toFixed(2)}
                            </Text>
                        </Text>
                    </TouchableOpacity>,

                    <TouchableOpacity style={styles.infoContainer}>
                        <Text style={styles.infoTitle}>Variation</Text>
                        <Text
                            style={[
                                styles.infoValue,
                                currentWorth > totalInvested
                                    ? styles.greenText
                                    : styles.redText
                            ]}
                        >
                            {currentWorth && (100 * (currentWorth / totalInvested - 1)).toFixed(2)}%
                        </Text>
                    </TouchableOpacity>,
                ]}
            />
        </SafeAreaView>
    )
}

export default MainDashboard