import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Dimensions } from 'react-native'
import { VictoryAxis, VictoryChart, VictoryLine } from 'victory-native'

import useExternalData from '../../../../services/externalData'

import {
  Container,
  RangeButtonsListContainer,
  RangeButton,
  RangeButtonText,
  PlaceholderText,
  PlaceholderTextContainer,
  RangeButtonContainer,
} from './styles'

interface PriceChartProps {
  ticker: string
}

interface ChartData {
  timestamp: number[]
  close: number[]
}

type ChartRange = '1d' | '5d' | '1mo' | '6mo' | 'YTD'

type ChartRangeOptions = Array<{
  key: string
  value: ChartRange
}>

const CHART_WIDTH = Dimensions.get('window').width - 60

const CHART_RANGE_OPTIONS: ChartRangeOptions = [
  { key: '1d', value: '1d' },
  { key: '5d', value: '5d' },
  { key: '1mo', value: '1mo' },
  { key: '6mo', value: '6mo' },
  { key: 'YTD', value: 'YTD' },
]

const PriceChart: React.FC<PriceChartProps> = ({ ticker }) => {
  const [chartData, setChartData] = useState<ChartData | null>(null)
  const [chartRange, setChartRange] = useState<ChartRange>('1d')

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
    getChartData(ticker, { range: chartRange }).then(setChartData)

    return () => {
      setChartData(null)
    }
  }, [chartRange, getChartData, ticker])

  return (
    <Container>
      <RangeButtonsListContainer>
        {CHART_RANGE_OPTIONS.map(({ key, value }) => (
          <RangeButton key={key}>
            <RangeButtonContainer active={chartRange === value}>
              <RangeButtonText
                onPress={() => setChartRange(value)}
                active={chartRange === value}
              >
                {key}
              </RangeButtonText>
            </RangeButtonContainer>
          </RangeButton>
        ))}
      </RangeButtonsListContainer>
      {chartData ? (
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
      ) : (
        <PlaceholderTextContainer>
          <PlaceholderText>Loading Chart...</PlaceholderText>
        </PlaceholderTextContainer>
      )}
    </Container>
  )
}

export default PriceChart
