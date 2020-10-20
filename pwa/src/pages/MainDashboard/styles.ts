import styled from 'styled-components/native'

interface ColoredTextProps {
  isPositive: boolean
}

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  background: #ededed;

  padding: 0 30px;
`
export const Header = styled.View`
  height: 40px;
`

export const InfoContainer = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
`

export const InfoTitle = styled.Text`
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: bold;
`

export const InfoValue = styled.Text`
  font-size: 18px;
`

export const ColoredText = styled.Text<ColoredTextProps>`
  color: ${props => (props.isPositive ? '#0a0' : '#d00')};
`
