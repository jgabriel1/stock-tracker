import React, { useState, useContext, useCallback } from 'react'
import {
  useNavigation,
  useRoute,
  RouteProp,
  StackActions,
  CommonActions,
} from '@react-navigation/native'
import { Switch } from 'react-native-switch'

import Button from '../../components/Button'
import ReturnButton from '../../components/ReturnButton'

import API from '../../services/api'
import * as Yahoo from '../../services/yahooFinance/stockInfo'
import DataContext from '../../store/dataContext'

import { AppStackParamList } from '../../routes/AppStack'
import lastValueOfArray from '../../utils/lastValueOfArray'

import { Container, Content, Header, Title } from './styles'
import Input from '../../components/Input'

const NewTransaction: React.FC = () => {
  const route = useRoute<RouteProp<AppStackParamList, 'NewTransaction'>>()
  const { initialTicker, initialTransactionType } = route.params

  const [transactionType, setTransactionType] = useState<'IN' | 'OUT'>(
    initialTransactionType || 'IN',
  )

  const [ticker, setTicker] = useState(initialTicker || '')
  const [quantity, setQuantity] = useState('')
  const [totalValue, setTotalValue] = useState('')

  const { dispatch } = useContext(DataContext)

  const navigation = useNavigation()

  const toggleTransactionType = useCallback((current: 'IN' | 'OUT'):
    | 'IN'
    | 'OUT' => {
    const possibilities = ['IN', 'OUT']
    const reversed = possibilities.filter(value => value !== current)[0]

    return reversed as 'IN' | 'OUT'
  }, [])

  const navigateToStocksList = useCallback(() => {
    navigation.dispatch(state => {
      const lastRoute = lastValueOfArray(state.routeNames)

      if (lastRoute === 'Details') {
        return StackActions.pop(2) // always brings back to StocksList
      }
      return CommonActions.navigate('Dashboard', { screen: 'StocksList' })
    })
  }, [navigation])

  const handleSubmitTransaction = useCallback(async () => {
    const data = {
      ticker,
      quantity: (transactionType === 'OUT' ? -1 : 1) * Number(quantity),
      total_value: (transactionType === 'OUT' ? -1 : 1) * Number(totalValue),
    }

    await API.postNewTransaction(data)
    const stocks = await API.getStocksData()

    navigateToStocksList()

    dispatch({ type: 'SET_STOCKS', payload: stocks })

    const tickers = Array.from(stocks.keys())
    const yahooStocks = await Yahoo.getStockInfo(tickers)

    dispatch({ type: 'SET_YAHOO', payload: yahooStocks })
  }, [
    dispatch,
    navigateToStocksList,
    quantity,
    ticker,
    totalValue,
    transactionType,
  ])

  return (
    <Container>
      <Header>
        <ReturnButton />

        <Title>Nova Transação</Title>
      </Header>

      <Content>
        <Switch
          value={transactionType === 'IN'}
          onValueChange={() => setTransactionType(toggleTransactionType)}
          activeText="Entrada"
          activeTextStyle={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#000',
          }}
          backgroundActive="#fff"
          inActiveText="Saída"
          inactiveTextStyle={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff',
          }}
          backgroundInactive="#000"
          circleSize={50}
          switchRightPx={3}
          switchLeftPx={3}
          switchWidthMultiplier={2.5}
          containerStyle={{ marginBottom: 32 }}
        />

        <Input
          onChangeText={text => setQuantity(text)}
          autoCapitalize="none"
          placeholder="Quantidade"
          keyboardType="number-pad"
        />

        <Input
          onChangeText={text => setTotalValue(text)}
          autoCapitalize="none"
          placeholder="Valor total"
          keyboardType="number-pad"
        />

        <Button text="Cadastrar" onPress={handleSubmitTransaction} />
      </Content>
    </Container>
  )
}

export default NewTransaction
