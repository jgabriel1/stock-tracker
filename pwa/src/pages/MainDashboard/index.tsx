import React, { useContext } from 'react'
import { Text, View, SafeAreaView } from 'react-native'

import usePeriodicEffect from '../../hooks/usePeriodicEffect'

import FourBoxGrid from '../../components/FourBoxGrid'
import PlatformAwareVictoryPie from './components/PlatformAwareVictoryPie'

import DataContext from '../../store/dataContext'
import {
  getTotalInvested,
  getCurrentWorth,
  getAllTickers,
  getCurrentWorthChartData
} from '../../store/selectors'

import * as Yahoo from '../../services/yahooFinance/stockInfo'

import styles from './styles'


const MainDashboard = () => {
  const { state, dispatch } = useContext(DataContext)

  const tickers = getAllTickers(state)
  const totalInvested = getTotalInvested(state)
  const currentWorth = getCurrentWorth(state)
  const currentWorthChartData = getCurrentWorthChartData(state)

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
        <Text style={styles.chartTitle}>Inventory</Text>
        <PlatformAwareVictoryPie
          padding={{ top: 100, bottom: 100, left: 100, right: 100, }}
          data={currentWorthChartData}
          labels={({ datum }) => `${datum.x}\n${datum.y.toFixed(1)}%`}
          labelRadius={({ radius }) => 1.1 * (radius as number)}
          // labelComponent??
          style={{
            labels: {
              fontSize: 14,
              textAlign: 'center',
            },
            parent: {
              flex: 1,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }
          }}
        />
      </View>

      <FourBoxGrid
        nodes={[
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Total Invested</Text>
            <Text style={styles.infoValue}>$ {totalInvested.toFixed(2)}</Text>
          </View>,

          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Current Worth</Text>
            <Text style={styles.infoValue}>$ {currentWorth.toFixed(2)}</Text>
          </View>,

          <View style={styles.infoContainer}>
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
          </View>,

          <View style={styles.infoContainer}>
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
          </View>,
        ]}
        outterStyle={styles.outterInfoContainer}
      />
    </SafeAreaView>
  )
}

export default MainDashboard
