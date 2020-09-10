import React, { useEffect, useState, useContext, useCallback } from 'react'
import { Text, View, SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Feather as Icon } from '@expo/vector-icons'

import ReturnButton from '../../components/ReturnButton'
import MainStockInfo from './components/MainStockInfo'
import TransactionList from './components/TransactionList'

import API from '../../services/api'
import { Transaction } from '../../services/api/types'

import DataContext from '../../store/dataContext'
import { getStockData } from '../../store/selectors'

import { AppStackParamList } from '../../routes/AppStack'

import styles from './styles'

const Detail: React.FC = () => {
  const [transactionList, setTransactionList] = useState<Transaction[]>([])

  const navigation = useNavigation<StackNavigationProp<AppStackParamList>>()
  const {
    params: { ticker },
  } = useRoute<RouteProp<AppStackParamList, 'Detail'>>()

  const { state } = useContext(DataContext)
  const stockData = getStockData(state, ticker)

  const navigateToNewTransactionWith = useCallback(
    (type: 'IN' | 'OUT') => {
      navigation.navigate('NewTransaction', {
        initialTicker: ticker,
        initialTransactionType: type,
      })
    },
    [navigation, ticker],
  )

  useEffect(() => {
    API.getTransactionsFor(ticker).then(setTransactionList)
  }, [ticker])

  return (
    <SafeAreaView style={styles.outerContainer}>
      <ReturnButton />

      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{ticker}</Text>
        </View>

        {stockData.regularMarketPrice && (
          <MainStockInfo
            averageBoughtPrice={stockData.average_bought_price}
            currentlyOwnedShares={stockData.currently_owned_shares}
            regularMarketPrice={stockData.regularMarketPrice}
          />
        )}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => navigateToNewTransactionWith('IN')}
            containerStyle={styles.button}
          >
            <Icon name="plus" size={32} color="#eee" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigateToNewTransactionWith('OUT')}
            containerStyle={styles.button}
          >
            <Icon name="minus" size={32} color="#eee" />
          </TouchableOpacity>
        </View>

        <TransactionList transactionList={transactionList} />
      </View>
    </SafeAreaView>
  )
}

export default Detail
