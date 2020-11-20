import { Dimensions } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import styled, { css } from 'styled-components/native'

interface RangeButtonProps {
  active: boolean
}

const CHART_WIDTH = Dimensions.get('window').width - 60

export const Container = styled.View`
  width: ${CHART_WIDTH}px;
`

export const RangeButtonsListContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 4px;
  height: 40px;
`

export const RangeButton = styled(RectButton)`
  flex: 1;
`

export const RangeButtonContainer = styled.View<RangeButtonProps>`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;

  ${props =>
    props.active &&
    css`
      border-bottom-width: 2px;
      margin-bottom: -2px;
    `}
`

export const RangeButtonText = styled.Text<RangeButtonProps>`
  font-size: 16px;
  opacity: 0.3;

  ${props =>
    props.active &&
    css`
      opacity: 1;
    `}
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
