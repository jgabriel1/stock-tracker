import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import ReturnButton from '../../components/ReturnButton'
import TransactionList from './components/TransactionList'

import { api } from '../../services/api'
import { Transaction } from '../../services/api/types'

import { AppStackParamList } from '../../routes/AppStack'

import {
  ColoredText,
  Container,
  Content,
  FullName,
  Header,
  InfoItem,
  InfoLabel,
  InfosContainer,
  InfoValue,
  Title,
} from './styles'
import { useStocks } from '../../hooks/stocks'
import { useNewTransaction } from '../../hooks/newTransaction'
import formatToReal from '../../utils/formatToReal'

const Detail: React.FC = () => {
  const [transactionList, setTransactionList] = useState<Transaction[]>([])

  const navigation = useNavigation<StackNavigationProp<AppStackParamList>>()
  const {
    params: { ticker },
  } = useRoute<RouteProp<AppStackParamList, 'Detail'>>()

  const { getStockData } = useStocks()
  const { setTransactionType } = useNewTransaction()

  const stockData = getStockData(ticker)

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
    api.get('transactions', { params: { ticker } }).then(response => {
      const { transactions } = response.data
      setTransactionList(transactions)
    })
  }, [ticker])

  const variation = useMemo(() => {
    const { regularMarketPrice, average_bought_price } = stockData

    const value = regularMarketPrice / average_bought_price

    return `${value.toFixed(2).replace('.', ',')}%`
  }, [stockData])

  const isPositive = useMemo(() => {
    return stockData.average_bought_price < stockData.regularMarketPrice
  }, [stockData])

  return (
    <Container>
      <Header>
        <ReturnButton />
        <Title>{ticker}</Title>
      </Header>

      <Content>
        <FullName>{stockData.fullName}</FullName>

        <InfosContainer>
          <InfoItem>
            <InfoLabel>Valor Atual:</InfoLabel>
            <InfoValue>{formatToReal(stockData.currentWorth)}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoLabel>Total investido:</InfoLabel>
            <InfoValue>{formatToReal(stockData.totalInvested)}</InfoValue>
          </InfoItem>
        </InfosContainer>

        <InfosContainer>
          <InfoItem>
            <InfoLabel>Valor atual:</InfoLabel>
            <InfoValue>
              {formatToReal(stockData.average_bought_price)}
            </InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoLabel>Valor médio de compra:</InfoLabel>
            <InfoValue>{formatToReal(stockData.regularMarketPrice)}</InfoValue>
          </InfoItem>
        </InfosContainer>

        <InfoItem>
          <InfoLabel>Variação:</InfoLabel>
          <InfoValue>
            <ColoredText isPositive={isPositive}>{variation}</ColoredText>
          </InfoValue>
        </InfoItem>

        <TransactionList transactionList={transactionList} />
      </Content>
    </Container>
  )
}

export default Detail
