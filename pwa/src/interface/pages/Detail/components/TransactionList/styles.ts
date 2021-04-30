import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import { Transaction } from '.'

interface ColoredTextProps {
  isPositive: boolean
}

const TransactionList = FlatList as new () => FlatList<Transaction>

export const Container = styled.View`
  margin-top: 16px;
`

export const Title = styled.Text`
  font-size: 24px;
`

export const List = styled(TransactionList)``

export const Item = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom-width: 1px;
  border-bottom-color: #b0b0b0;
`

export const ItemValue = styled.Text`
  font-size: 16px;
`

export const ColoredText = styled.Text<ColoredTextProps>`
  color: ${props => (props.isPositive ? '#0a0' : '#f00')};
`
