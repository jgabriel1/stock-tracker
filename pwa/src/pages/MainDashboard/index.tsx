import React, { useMemo } from 'react'

import FourBoxGrid from '../../components/FourBoxGrid'
import PlatformAwareVictoryPie from './components/PlatformAwareVictoryPie'

import { useStocks } from '../../hooks/stocks'

import {
  Container,
  Header,
  InfoContainer,
  InfoTitle,
  InfoValue,
  ColoredText,
} from './styles'

const MainDashboard: React.FC = () => {
  const { currentWorth, totalInvested, stocksData } = useStocks()

  const currentWorthChartData = useMemo(() => {
    const chartDataMap = new Map<string, number>()

    stocksData.forEach(stock => {
      if (chartDataMap.size <= 5) {
        chartDataMap.set(stock.ticker, stock.currentWorth || 0)
      } else if (chartDataMap.has('Outro')) {
        const accumulated = chartDataMap.get('Outro') as number
        chartDataMap.set('Outro', accumulated + (stock.currentWorth || 0))
      } else {
        chartDataMap.set('Outro', stock.currentWorth || 0)
      }
    })

    return Array.from(chartDataMap.entries()).map(
      ([ticker, stockCurrentWorth]) => {
        const percentValue = (100 * stockCurrentWorth) / currentWorth
        return {
          x: ticker,
          y: percentValue,
        }
      },
    )
  }, [currentWorth, stocksData])

  return (
    <Container>
      <Header />
      <PlatformAwareVictoryPie
        padding={{ top: 80, bottom: 80, left: 80, right: 80 }}
        data={currentWorthChartData}
        labels={({ datum }) => `${datum.x}\n${datum.y.toFixed(1)}%`}
        labelRadius={({ radius }) => 1.1 * (radius as number)}
        // labelComponent??
        style={{
          labels: {
            fontSize: 14,
            textAlign: 'center',
          },
          parent: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      />

      <FourBoxGrid
        nodes={[
          <InfoContainer>
            <InfoTitle>Total Invested</InfoTitle>
            <InfoValue>{`$ ${totalInvested.toFixed(2)}`}</InfoValue>
          </InfoContainer>,

          <InfoContainer>
            <InfoTitle>Current Worth</InfoTitle>
            <InfoValue>{`$ ${currentWorth.toFixed(2)}`}</InfoValue>
          </InfoContainer>,

          <InfoContainer>
            <InfoTitle>Balance</InfoTitle>
            <InfoValue>
              <ColoredText isPositive={currentWorth > totalInvested}>
                {currentWorth && (currentWorth - totalInvested).toFixed(2)}
              </ColoredText>
            </InfoValue>
          </InfoContainer>,

          <InfoContainer>
            <InfoTitle>Variation</InfoTitle>
            <InfoValue>
              <ColoredText isPositive={currentWorth > totalInvested}>
                {currentWorth &&
                  (100 * (currentWorth / totalInvested - 1)).toFixed(2)}
              </ColoredText>
            </InfoValue>
          </InfoContainer>,
        ]}
        outterStyle={{ flex: 0.66 }}
      />
    </Container>
  )
}

export default MainDashboard
