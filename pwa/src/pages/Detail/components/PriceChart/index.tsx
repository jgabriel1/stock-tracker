import React from 'react'
import { Dimensions } from 'react-native'
import { VictoryChart, VictoryLine } from 'victory-native'

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
      1605729251,
    ],
    close: [
      73.412,
      77.378,
      68.34,
      63.572,
      73.45,
      79.485,
      91.2,
      106.26,
      129.04,
      115.81,
      108.86,
      119.39,
      119.271,
    ],
  }

  return (
    <Container>
      <VictoryChart>
        <VictoryLine
          width={CHART_WIDTH}
          data={timestamp.map((time, index) => {
            return {
              x: time,
              y: close[index],
            }
          })}
        />
      </VictoryChart>
    </Container>
  )
}

export default PriceChart
