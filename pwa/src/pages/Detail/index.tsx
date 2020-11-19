import React, { useCallback, useMemo } from 'react'
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'

import ReturnButton from '../../components/ReturnButton'
import TransactionList from './components/TransactionList'
import PriceChart from './components/PriceChart'
import Infos from './components/Infos'

import { AppStackParamList } from '../../routes/AppStack'

import { useStocks } from '../../hooks/stocks'
import { useNewTransaction } from '../../hooks/newTransaction'

import {
  Container,
  Content,
  FullName,
  Header,
  Title,
  MainPanel,
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

      navigation.navigate('CreateTransaction')
    },
    [
      navigation,
      setTransactionStock,
      setTransactionType,
      stockData.fullName,
      ticker,
    ],
  )

  return (
    <Container>
      <Header>
        <ReturnButton />
        <Title>{ticker}</Title>
      </Header>

      <Content>
        <FullName>{stockData.fullName}</FullName>

        <MainPanel
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          <Infos stockData={stockData} />
          <PriceChart ticker={ticker} />
        </MainPanel>

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
