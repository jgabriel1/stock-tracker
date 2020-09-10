import React from 'react'
import { Text, View } from 'react-native'

import styles from './styles'

interface MainStockInfoProps {
  currentlyOwnedShares: number
  averageBoughtPrice: number
  regularMarketPrice: number
}

const MainStockInfo: React.FC<MainStockInfoProps> = ({
  currentlyOwnedShares,
  averageBoughtPrice,
  regularMarketPrice,
}) => {
  const totalInvested = currentlyOwnedShares * averageBoughtPrice
  const currentWorth = currentlyOwnedShares * regularMarketPrice

  const balance = currentWorth - totalInvested
  const variation = 100 * (regularMarketPrice / averageBoughtPrice - 1)

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>Total Invested:</Text>
          <Text style={styles.itemValue}>
            {`$ ${totalInvested.toFixed(2)}`}
          </Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemTitle}>Current Worth:</Text>
          <Text style={styles.itemValue}>{`$ ${currentWorth.toFixed(2)}`}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>Balance:</Text>
          <Text style={styles.itemValue}>{`$ ${balance.toFixed(2)}`}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemTitle}>Variation(%):</Text>
          <Text style={styles.itemValue}>{`${variation.toFixed(2)} %`}</Text>
        </View>
      </View>
    </View>
  )
}

export default MainStockInfo
