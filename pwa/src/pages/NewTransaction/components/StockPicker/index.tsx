import React, { useState, SetStateAction, Dispatch, useCallback } from 'react'
import { Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native'

import useDebounce from '../../../../hooks/useDebounce'

import {
  getSearchQuery,
  YahooSearchAnswer,
} from '../../../../services/yahooFinance/stockSearch'

import styles from './styles'

interface Props {
  ticker: string
  setTicker: Dispatch<SetStateAction<string>>
  setShowStockPicker: Dispatch<SetStateAction<boolean>>
}

const StockPicker = ({ setTicker, setShowStockPicker }: Props) => {
  const [answerList, setAnswerList] = useState<YahooSearchAnswer[]>([])

  const debouncedQuery = useDebounce(async (text: string) => {
    if (text.length > 1) {
      const answers = await getSearchQuery(text)
      setAnswerList(answers)
    } else {
      setAnswerList([])
    }
  }, 500)

  const handleSelectStock = useCallback(
    (symbol: string) => {
      setTicker(symbol)
      setShowStockPicker(false)
    },
    [setShowStockPicker, setTicker],
  )

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={text => debouncedQuery(text)}
        autoCapitalize="none"
        placeholder="Stock Ticker"
      />

      <FlatList
        data={answerList}
        keyExtractor={answer => answer.symbol}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => handleSelectStock(item.symbol)}
          >
            <View style={{ ...styles.listItemRow, marginBottom: 8 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                {item.symbol}
              </Text>
              <Text>{`${item.typeDisp} - ${item.exchange}`}</Text>
            </View>

            <View style={styles.listItemRow}>
              <Text>{item.longname ? item.longname : '-'}</Text>
            </View>
          </TouchableOpacity>
        )}
        style={{ width: '80%', borderColor: '#999' }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default StockPicker
