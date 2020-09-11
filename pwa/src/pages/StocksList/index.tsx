import React, { useContext } from 'react'
import { Text, View, TouchableOpacity, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import DataContext from '../../store/dataContext'
import { getAllStocksData } from '../../store/selectors'

import NewTransactionButton from './components/NewTransactionButton'

import styles from './styles'

const StockList: React.FC = () => {
  const { state } = useContext(DataContext)
  const stocksList = getAllStocksData(state)

  const navigation = useNavigation()

  function navigateToDetail(ticker: string): void {
    navigation.navigate('Detail', { ticker })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listHeaderContainer}>
        <Text style={styles.listHeaderText}>My Stocks</Text>
      </View>
      <FlatList
        data={stocksList}
        keyExtractor={item => item.ticker}
        renderItem={({ item: stock }) => {
          const { ticker, currently_owned_shares, average_bought_price } = stock

          const { regularMarketPrice } = stock
          const potentialProfit = regularMarketPrice
            ? (regularMarketPrice - average_bought_price) *
            currently_owned_shares
            : 0

          return (
            <TouchableOpacity
              style={styles.listItemContainer}
              onPress={() => navigateToDetail(ticker)}
            >
              <View style={styles.tickerContainer}>
                <Text
                  style={styles.tickerText}
                  adjustsFontSizeToFit
                  numberOfLines={1}
                >
                  {ticker}
                </Text>
              </View>

              <View style={styles.infoContainer}>
                <View style={styles.infoLabelsContainer}>
                  <View style={styles.infoLabelItem}>
                    <Text style={styles.infoLabelText}>Owned</Text>
                  </View>

                  <View style={styles.infoLabelItem}>
                    <Text style={styles.infoLabelText}>Bought at</Text>
                  </View>

                  <View style={styles.infoLabelItem}>
                    <Text style={styles.infoLabelText}>Current</Text>
                  </View>

                  <View style={styles.infoLabelItem}>
                    <Text style={styles.infoLabelText}>Balance</Text>
                  </View>
                </View>

                <View style={styles.infoValuesContainer}>
                  <View style={styles.infoValueItem}>
                    <Text>{currently_owned_shares}</Text>
                  </View>

                  <View style={styles.infoValueItem}>
                    <Text>{average_bought_price.toFixed(2)}</Text>
                  </View>

                  {regularMarketPrice ? (
                    <>
                      <View style={styles.infoValueItem}>
                        <Text>{regularMarketPrice.toFixed(2)}</Text>
                      </View>
                      <View style={styles.infoValueItem}>
                        <Text
                          style={[
                            potentialProfit > 0
                              ? styles.greenText
                              : styles.redText,
                          ]}
                        >
                          {potentialProfit.toFixed(2)}
                        </Text>
                      </View>
                    </>
                  ) : (
                      <>
                        <View style={styles.infoValueItem}>
                          <Text>-</Text>
                        </View>
                        <View style={styles.infoValueItem}>
                          <Text>-</Text>
                        </View>
                      </>
                    )}
                </View>
              </View>
            </TouchableOpacity>
          )
        }}
        scrollEnabled
        alwaysBounceVertical
        contentContainerStyle={styles.listContainer}
      />
      <NewTransactionButton />
    </SafeAreaView>
  )
}

export default StockList
