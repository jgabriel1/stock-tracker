import styled from 'styled-components/native'

interface ColoredTextProps {
  isPositive: boolean
}

export const Container = styled.View`
  width: 100%;
`

export const InfosContainer = styled.View`
  margin-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #b0b0b0;
`

export const InfoItem = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

export const InfoLabel = styled.Text`
  font-size: 16px;
  font-weight: bold;
`

export const InfoValue = styled.Text`
  font-size: 18px;
`

export const ColoredText = styled.Text<ColoredTextProps>`
  color: ${props => (props.isPositive ? '#0a0' : '#f00')};
`
