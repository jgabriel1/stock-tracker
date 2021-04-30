import styled, { css } from 'styled-components/native'

interface RangeButtonProps {
  active: boolean
}

const CHART_HEIGHT = 320

export const Container = styled.View`
  width: 100%;
  margin-bottom: 24px;
`

export const RangeButtonsListContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 4px;
  height: 40px;
`

export const RangeButton = styled.TouchableNativeFeedback`
  flex: 1;
`

export const RangeButtonContainer = styled.View<RangeButtonProps>`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  line-height: 40px;

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

  width: 100%;
  text-align: center;

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
  width: 100%;
  height: ${CHART_HEIGHT}px;
`

export const PlaceholderText = styled.Text`
  font-size: 20px;
`
