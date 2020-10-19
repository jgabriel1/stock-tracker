import React, { useCallback, useMemo } from 'react'
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'

import ReturnButton from '../../components/ReturnButton'
import TransactionList from './components/TransactionList'

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

/*
  TODO:
  - Make the new transaction buttons into a floating button in the bottom
  right or middle of the screen.
  - Make the info block slide to the side with a future chart component. Or
  put it below the chart.
*/

type DetailRouteProps = RouteProp<AppStackParamList, 'Detail'>

const Detail: React.FC = () => {
  const navigation = useNavigation()

  const route = useRoute<DetailRouteProps>()
  const { ticker } = route.params

  const { getStockData } = useStocks()
  const { setTransactionType, setTransactionStock } = useNewTransaction()

  const stockData = useMemo(() => getStockData(ticker), [getStockData, ticker])

  const navigateToNewTransaction = useCallback(
    (type: 'income' | 'outcome') => {
      setTransactionType(type)
      setTransactionStock({
        ticker,
        fullName: stockData.fullName,
      })

      navigation.navigate('NewTransaction', {})
    },
    [
      navigation,
      setTransactionStock,
      setTransactionType,
      stockData.fullName,
      ticker,
    ],
  )

  const variation = useMemo(() => {
    const { regularMarketPrice, average_bought_price } = stockData

    const value = 100 * (regularMarketPrice / average_bought_price - 1)

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
            <InfoValue>{formatToReal(stockData.regularMarketPrice)}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoLabel>Valor médio de compra:</InfoLabel>
            <InfoValue>
              {formatToReal(stockData.average_bought_price)}
            </InfoValue>
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
              onPress={() => navigateToNewTransaction('income')}
            >
              <Feather name="plus" color="#ededed" size={24} />

              <NewTransactionButtonText>Entrada</NewTransactionButtonText>
            </NewTransactionButtonLeft>

            <NewTransactionButtonRight
              activeOpacity={0.9}
              onPress={() => navigateToNewTransaction('outcome')}
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
