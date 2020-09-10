import React from 'react'
import { Text, View, FlatList } from 'react-native'
import { Transaction } from '../../../../services/api/types'

import styles from './styles'

interface TransactionListProps {
  transactionList: Transaction[]
}

interface Item {
  item: Transaction
  index: number
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactionList,
}) => {
  const headerComponent = () => (
    <View style={styles.gridRow}>
      <View style={styles.gridColumn}>
        <Text>Quantity</Text>
      </View>

      <View style={styles.gridColumn}>
        <Text>Avg. Price</Text>
      </View>

      <View style={styles.gridColumn}>
        <Text>Total</Text>
      </View>

      <View style={styles.gridColumn}>
        <Text>Date</Text>
      </View>
    </View>
  )

  const renderItem = ({ item, index }: Item) => {
    const date = new Date((item.timestamp as number) * 1000)

    return (
      <View style={styles.gridRow} key={index}>
        <View style={styles.gridColumn}>
          <Text>{`x ${item.quantity}`}</Text>
        </View>

        <View style={styles.gridColumn}>
          <Text>{`$ ${item.average_price?.toFixed(2)}`}</Text>
        </View>

        <View style={styles.gridColumn}>
          <Text>{`$ ${item.total_value.toFixed(2)}`}</Text>
        </View>

        <View style={styles.gridColumn}>
          <Text>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</Text>
        </View>
      </View>
    )
  }

  return (
    <FlatList
      style={{ width: '100%' }}
      data={transactionList}
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
      ListHeaderComponent={headerComponent}
      keyExtractor={(item, index) => String(index)}
      renderItem={renderItem}
    />
  )
}

export default TransactionList
