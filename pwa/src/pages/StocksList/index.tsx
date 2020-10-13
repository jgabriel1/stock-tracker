import React, { useCallback } from 'react'
import { Text, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useStocks } from '../../hooks/stocks'

import NewTransactionButton from './components/NewTransactionButton'

import {
  ColoredText,
  Container,
  StockFullNameText,
  StockIdentificationContainer,
  StockInfoContainer,
  StockInfoLabelItem,
  StockInfoLabelsContainer,
  StockInfoLabelText,
  StockInfoValueItem,
  StockInfoValuesContainer,
  StockItemContainer,
  StockTickerText,
  TitleContainer,
  TitleText,
} from './styles'

const StockList: React.FC = () => {
  const { stocksData } = useStocks()

  const navigation = useNavigation()

  const navigateToDetail = useCallback(
    (ticker: string) => {
      navigation.navigate('Detail', { ticker })
    },
    [navigation],
  )

  return (
    <Container>
      <TitleContainer>
        <TitleText>Minhas ações</TitleText>
      </TitleContainer>
      <FlatList
        data={stocksData}
        keyExtractor={item => item.ticker}
        renderItem={({ item: stock }) => {
          const { ticker, currently_owned_shares, average_bought_price } = stock

          const { regularMarketPrice } = stock
          const potentialProfit = regularMarketPrice
            ? (regularMarketPrice - average_bought_price) *
              currently_owned_shares
            : 0

          return (
            <StockItemContainer onPress={() => navigateToDetail(ticker)}>
              <StockIdentificationContainer>
                <StockTickerText adjustsFontSizeToFit numberOfLines={1}>
                  {ticker}
                </StockTickerText>
                <StockFullNameText>{stock.fullName}</StockFullNameText>
              </StockIdentificationContainer>

              <StockInfoContainer>
                <StockInfoLabelsContainer>
                  <StockInfoLabelItem>
                    <StockInfoLabelText>Quant.</StockInfoLabelText>
                  </StockInfoLabelItem>

                  <StockInfoLabelItem>
                    <StockInfoLabelText>Compra</StockInfoLabelText>
                  </StockInfoLabelItem>

                  <StockInfoLabelItem>
                    <StockInfoLabelText>Atual</StockInfoLabelText>
                  </StockInfoLabelItem>

                  <StockInfoLabelItem>
                    <StockInfoLabelText>Variação</StockInfoLabelText>
                  </StockInfoLabelItem>
                </StockInfoLabelsContainer>

                <StockInfoValuesContainer>
                  <StockInfoValueItem>
                    <Text>{currently_owned_shares}</Text>
                  </StockInfoValueItem>

                  <StockInfoValueItem>
                    <Text>{average_bought_price.toFixed(2)}</Text>
                  </StockInfoValueItem>

                  {regularMarketPrice ? (
                    <>
                      <StockInfoValueItem>
                        <Text>{regularMarketPrice.toFixed(2)}</Text>
                      </StockInfoValueItem>
                      <StockInfoValueItem>
                        <ColoredText isPositive={potentialProfit > 0}>
                          {potentialProfit.toFixed(2)}
                        </ColoredText>
                      </StockInfoValueItem>
                    </>
                  ) : (
                    <>
                      <StockInfoValueItem>
                        <Text>-</Text>
                      </StockInfoValueItem>
                      <StockInfoValueItem>
                        <Text>-</Text>
                      </StockInfoValueItem>
                    </>
                  )}
                </StockInfoValuesContainer>
              </StockInfoContainer>
            </StockItemContainer>
          )
        }}
        scrollEnabled
        alwaysBounceVertical
        // contentContainerStyle={styles.listContainer}
      />
      <NewTransactionButton />
    </Container>
  )
}

export default StockList
