import React, { useMemo } from 'react'

import formatToReal from '../../../../utils/formatToReal'

import {
  Container,
  InfosContainer,
  InfoItem,
  InfoLabel,
  InfoValue,
  ColoredText,
} from './styles'

interface InfosProps {
  stockData: {
    ticker: string
    fullName: string
    currently_owned_shares: number
    average_bought_price: number
    regularMarketPrice: number
    currentWorth: number
    totalInvested: number
  }
}

const Infos: React.FC<InfosProps> = ({ stockData }) => {
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
      <InfosContainer>
        <InfoItem>
          <InfoLabel>Variação Total:</InfoLabel>
          <InfoValue>
            <ColoredText isPositive={isPositive}>{variation}</ColoredText>
          </InfoValue>
        </InfoItem>
      </InfosContainer>

      <InfosContainer>
        <InfoItem>
          <InfoLabel>Valor atual:</InfoLabel>
          <InfoValue>{formatToReal(stockData.regularMarketPrice)}</InfoValue>
        </InfoItem>

        <InfoItem>
          <InfoLabel>Valor médio de compra:</InfoLabel>
          <InfoValue>{formatToReal(stockData.average_bought_price)}</InfoValue>
        </InfoItem>
      </InfosContainer>

      <InfosContainer>
        <InfoItem>
          <InfoLabel>Total Atual:</InfoLabel>
          <InfoValue>{formatToReal(stockData.currentWorth)}</InfoValue>
        </InfoItem>

        <InfoItem>
          <InfoLabel>Total investido:</InfoLabel>
          <InfoValue>{formatToReal(stockData.totalInvested)}</InfoValue>
        </InfoItem>
      </InfosContainer>
    </Container>
  )
}

export default Infos
