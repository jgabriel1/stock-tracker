import { Dimensions } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled.View`
  width: ${Dimensions.get('window').width - 60}px;
`
