import React from 'react'
import { RectButtonProperties } from 'react-native-gesture-handler'

import { Container, ButtonText } from './styles'

interface ButtonProps extends RectButtonProperties {
  text: string
}

const Button: React.FC<ButtonProps> = ({ text, ...rest }) => {
  return (
    <Container {...rest}>
      <ButtonText>{text}</ButtonText>
    </Container>
  )
}

export default Button
