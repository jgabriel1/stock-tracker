import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Container = styled(SafeAreaView)`
  flex: 1;
`

export const Header = styled.View`
  height: 80px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
`

export const Content = styled.ScrollView`
  flex: 1;
  padding: 0 30px 0;
`

export const FullName = styled.Text`
  font-size: 24px;
  margin-bottom: 16px;
`

export const NewTransactionContainer = styled.View`
  margin: 16px 0;
`

export const NewTransactionTitle = styled.Text`
  font-size: 24px;
  margin-bottom: 16px;
`

export const NewTransactionButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const NewTransactionButtonText = styled.Text`
  color: #ededed;
  font-size: 18px;
`

export const NewTransactionButtonLeft = styled.TouchableOpacity`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  height: 56px;
  padding: 20px;
  background: #3a3a3a;
  border-top-left-radius: 28px;
  border-bottom-left-radius: 28px;
`

export const NewTransactionButtonRight = styled.TouchableOpacity`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  height: 56px;
  padding: 20px;
  background: #3a3a3a;
  border-top-right-radius: 28px;
  border-bottom-right-radius: 28px;
`
