import styled from 'styled-components/native'
import Animated from 'react-native-reanimated'

export const Container = styled.View`
  width: 100%;
  margin-bottom: 16px;
`

export const ChosenStockInfoContainer = styled.View`
  width: 100%;
  margin-bottom: -32px;
`

export const ChosenStockTicker = styled.Text`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 16px;
`

export const ChosenStockFullName = styled.Text`
  font-size: 32px;
`

export const InputContainer = styled.View`
  background-color: #ededed;
  height: 60;
  margin-bottom: 16;
`

export const ResponseItemListContainer = styled(Animated.View)`
  background: #fff;
  z-index: -1;
  elevation: -1;
  margin: -400% 0 -64px;
`

export const ItemContainer = styled.TouchableOpacity`
  margin-bottom: 16px;
  background: #ededed;
  border: 1px solid #d2d2d2;
  border-radius: 30px;
  padding: 20px 24px;
  justify-content: center;
`

export const ItemNameContainer = styled.View`
  width: 100%;
  margin-bottom: 16px;
`

export const ItemTicker = styled.Text`
  font-size: 20px;
  font-weight: bold;
`

export const ItemFullName = styled.Text`
  font-size: 24px;
  margin-bottom: 8px;
`

export const ItemInfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`

export const ItemInfoLabel = styled.Text`
  font-size: 18px;
  font-weight: bold;
`

export const ItemInfoValue = styled.Text`
  font-size: 18px;
`
