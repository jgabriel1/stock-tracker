import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  background: #3a3a3a;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  border-radius: 30px;
`

export const ButtonText = styled.Text`
  color: #ededed;
  font-size: 18px;
  font-weight: 600;
`
