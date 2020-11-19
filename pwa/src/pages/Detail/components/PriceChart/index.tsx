import React, { useEffect, useMemo, useState } from 'react'
import { Dimensions } from 'react-native'
import { VictoryAxis, VictoryChart, VictoryLine } from 'victory-native'

import useExternalData from '../../../../services/externalData'

import { Container, PlaceholderText, PlaceholderTextContainer } from './styles'

interface PriceChartProps {
  ticker: string
}

interface ChartData {
  timestamp: number[]
  close: number[]
}

const CHART_WIDTH = Dimensions.get('window').width - 60

const PriceChart: React.FC<PriceChartProps> = ({ ticker }) => {
  const [chartData, setChartData] = useState<ChartData | null>(null)

  const { getChartData } = useExternalData()

  const parsedData = useMemo(() => {
    return (
      chartData &&
      chartData.timestamp.map((time, index) => {
        return {
          x: new Date(time * 1000),
          y: chartData.close[index],
        }
      })
    )
  }, [chartData])

  useEffect(() => {
    getChartData(ticker).then(setChartData)

    return () => {
      setChartData(null)
    }
  }, [getChartData, ticker])

  if (!chartData) {
    return (
      <PlaceholderTextContainer>
        <PlaceholderText>Loading Chart...</PlaceholderText>
      </PlaceholderTextContainer>
    )
  }

  return (
    <Container>
      <VictoryChart
        width={CHART_WIDTH}
        padding={{
          top: 20,
          bottom: 40,
          right: 20,
          left: 50,
        }}
        scale={{ x: 'time', y: 'linear' }}
      >
        <VictoryLine interpolation="basis" data={parsedData || undefined} />

        <VictoryAxis
          tickCount={5}
          fixLabelOverlap
          style={{
            tickLabels: {
              fontSize: 12,
            },
            grid: {
              stroke: 'rgba(100,100,100,0.20)',
              strokeWidth: 1,
            },
            ticks: {
              stroke: 'grey',
              size: 5,
            } as React.CSSProperties,
          }}
        />

        <VictoryAxis
          dependentAxis
          tickCount={5}
          fixLabelOverlap
          style={{
            axis: {
              stroke: 'none',
            },
            grid: {
              stroke: 'rgba(100,100,100,0.20)',
              strokeWidth: 1,
            },
          }}
        />
      </VictoryChart>
    </Container>
  )
}

export default PriceChart
