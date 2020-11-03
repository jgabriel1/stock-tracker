import styled from 'styled-components/native'
import { BorderlessButton } from 'react-native-gesture-handler'

export const Container = styled(BorderlessButton)`
  padding: 8px 8px;
  border-radius: 32px;
  top: 32px;
  right: 16px;
  position: absolute;

  z-index: 10;
  elevation: 10;
`
