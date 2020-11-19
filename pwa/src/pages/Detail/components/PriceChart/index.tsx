import React from 'react'
import { Dimensions } from 'react-native'
import { VictoryAxis, VictoryChart, VictoryLine } from 'victory-native'

import { Container } from './styles'

interface PriceChartProps {}

const CHART_WIDTH = Dimensions.get('window').width - 60

const PriceChart: React.FC<PriceChartProps> = () => {
  const { timestamp, close } = {
    timestamp: [
      1575176400,
      1577854800,
      1580533200,
      1583038800,
      1585713600,
      1588305600,
      1590984000,
      1593576000,
      1596254400,
      1598932800,
      1601524800,
      1604203200,
      1605733201,
    ],
    close: [
      87.92,
      84.83,
      78.43,
      65.74,
      76.73,
      77.99,
      73.59,
      76.53,
      84.47,
      85.92,
      86.96,
      98.6,
      97.91,
    ],
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
        <VictoryLine
          interpolation="basis"
          data={timestamp.map((time, index) => {
            return {
              x: new Date(time * 1000),
              y: close[index],
            }
          })}
        />

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
