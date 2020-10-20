import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface ColoredTextProps {
  isPositive: boolean
}

export const Container = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
  padding: 0 30px;
  background: #ededed;
`

export const TitleContainer = styled.View`
  margin-top: 32px;
  margin-bottom: 32px;
`

export const TitleText = styled.Text`
  font-size: 28px;
  font-weight: bold;
  text-align: left;
`

export const StockItemContainer = styled.TouchableOpacity`
  background: #fff;
  margin-bottom: 8px;
  border-radius: 10px;
  padding: 8px;
  width: 100%;

  align-self: center;
`

export const StockIdentificationContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px;
`

export const StockTickerText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  width: 80px;
`

export const StockFullNameText = styled.Text`
  font-size: 16px;
`

export const StockInfoContainer = styled.View``

export const StockInfoLabelsContainer = styled.View`
  flex-direction: row;
`

export const StockInfoLabelItem = styled.View`
  flex: 1;
  padding-top: 8px;
  align-items: center;
`

export const StockInfoLabelText = styled.Text`
  font-size: 14px;
  font-weight: bold;
`

export const StockInfoValuesContainer = styled.View`
  flex-direction: row;
`

export const StockInfoValueItem = styled.View`
  flex: 1;
  align-items: center;
  padding: 8px 0;
`

export const ColoredText = styled.Text<ColoredTextProps>`
  color: ${props => (props.isPositive ? '#0a0' : '#d00')};
`
