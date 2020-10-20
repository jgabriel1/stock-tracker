import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled(RectButton)`
  position: absolute;
  bottom: 0;
  width: 80%;
  align-self: center;
  margin-bottom: 24px;
  padding: 0 16px;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  height: 50px;
  border-radius: 25px;
  background-color: #3a3a3a;
`

export const ButtonTextContainer = styled.View``

export const ButtonText = styled.Text`
  flex: 1;

  font-size: 20px;
  color: #ededed;
  font-weight: 600;

  margin-left: 32px;
  align-items: center;
  justify-content: center;
`
