import React, { useMemo } from 'react'
import { Text, View, SafeAreaView } from 'react-native'

import FourBoxGrid from '../../components/FourBoxGrid'
import PlatformAwareVictoryPie from './components/PlatformAwareVictoryPie'

import styles, { Container, Header } from './styles'
import { useStocks } from '../../hooks/stocks'

const MainDashboard: React.FC = () => {
  const { currentWorth, totalInvested, stocksData } = useStocks()

  const currentWorthChartData = useMemo(() => {
    const chartDataMap = new Map<string, number>()

    stocksData.forEach(stock => {
      if (chartDataMap.size <= 5) {
        chartDataMap.set(stock.ticker, stock.currentWorth || 0)
      } else if (chartDataMap.has('Outro')) {
        const accumulated = chartDataMap.get('Outro') as number
        chartDataMap.set('Outro', accumulated + (stock.currentWorth || 0))
      } else {
        chartDataMap.set('Outro', stock.currentWorth || 0)
      }
    })

    return Array.from(chartDataMap.entries()).map(
      ([ticker, stockCurrentWorth]) => {
        const percentValue = (100 * stockCurrentWorth) / currentWorth
        return {
          x: ticker,
          y: percentValue,
        }
      },
    )
  }, [currentWorth, stocksData])

  // TODO: refactor to use styled components
  return (
    <Container>
      <Header />
      <PlatformAwareVictoryPie
        padding={{ top: 100, bottom: 100, left: 100, right: 100 }}
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
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
          },
        }}
      />

      <FourBoxGrid
        nodes={[
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Total Invested</Text>
            <Text style={styles.infoValue}>
              {`$ ${totalInvested.toFixed(2)}`}
            </Text>
          </View>,

          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Current Worth</Text>
            <Text style={styles.infoValue}>
              {`$ ${currentWorth.toFixed(2)}`}
            </Text>
          </View>,

          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Balance</Text>
            <Text style={styles.infoValue}>
              <Text
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
                  : styles.redText,
              ]}
            >
              {currentWorth &&
                (100 * (currentWorth / totalInvested - 1)).toFixed(2)}
            </Text>
          </View>,
        ]}
        outterStyle={styles.outterInfoContainer}
      />
    </Container>
  )
}

export default MainDashboard
