import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'

import ReturnButton from '../../components/ReturnButton'
import TransactionList from './components/TransactionList'

import { api } from '../../services/api'
import { Transaction } from '../../services/api/types'

import { AppStackParamList } from '../../routes/AppStack'

import { useStocks } from '../../hooks/stocks'
import { useNewTransaction } from '../../hooks/newTransaction'

import formatToReal from '../../utils/formatToReal'

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
  NewTransactionContainer,
  NewTransactionTitle,
  NewTransactionButtonsContainer,
  NewTransactionButtonText,
  NewTransactionButtonLeft,
  NewTransactionButtonRight,
} from './styles'

type DetailRouteProps = RouteProp<AppStackParamList, 'Detail'>

const Detail: React.FC = () => {
  const navigation = useNavigation()
  const {
    params: { ticker },
  } = useRoute<DetailRouteProps>()

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

  const variation = useMemo(() => {
    const { regularMarketPrice, average_bought_price } = stockData

    const value = regularMarketPrice / average_bought_price

    const signal = regularMarketPrice > average_bought_price ? '+' : '-'

    return `${signal}${value.toFixed(2).replace('.', ',')}%`
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
          <InfoLabel>Variação Total:</InfoLabel>
          <InfoValue>
            <ColoredText isPositive={isPositive}>{variation}</ColoredText>
          </InfoValue>
        </InfoItem>

        <NewTransactionContainer>
          <NewTransactionTitle>Nova transação</NewTransactionTitle>

          <NewTransactionButtonsContainer>
            <NewTransactionButtonLeft
              activeOpacity={0.9}
              onPress={() => console.log('entrada')}
            >
              <Feather name="plus" color="#ededed" size={24} />

              <NewTransactionButtonText>Entrada</NewTransactionButtonText>
            </NewTransactionButtonLeft>

            <NewTransactionButtonRight
              activeOpacity={0.9}
              onPress={() => console.log('saída')}
            >
              <NewTransactionButtonText>Saída</NewTransactionButtonText>

              <Feather name="minus" color="#ededed" size={24} />
            </NewTransactionButtonRight>
          </NewTransactionButtonsContainer>
        </NewTransactionContainer>

        <TransactionList ticker={ticker} />
      </Content>
    </Container>
  )
}

export default Detail
