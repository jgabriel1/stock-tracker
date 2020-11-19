import { Dimensions } from 'react-native'
import styled from 'styled-components/native'

const CHART_WIDTH = Dimensions.get('window').width - 60

export const Container = styled.View`
  width: ${Dimensions.get('window').width - 60}px;
`

export const PlaceholderTextContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: ${CHART_WIDTH}px;
`

export const PlaceholderText = styled.Text`
  font-size: 20px;
`
