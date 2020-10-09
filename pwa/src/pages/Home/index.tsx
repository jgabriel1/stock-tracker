import React from 'react'
import { useNavigation } from '@react-navigation/native'

import Button from '../../components/Button'

import { Container, Title, TitleText, TitleDescription } from './styles'

const Home: React.FC = () => {
  const navigation = useNavigation()

  function navigateToLogin() {
    navigation.navigate('Login')
  }

  function navigateToRegister() {
    navigation.navigate('Register')
  }

  return (
    <Container>
      <Title>
        <TitleText>Stock Tracker</TitleText>
        <TitleDescription>
          An app to track the stocks you own and project your gains.
        </TitleDescription>
      </Title>

      <>
        <Button text="Login" onPress={navigateToLogin} />
        <Button text="Register" onPress={navigateToRegister} />
      </>
    </Container>
  )
}

export default Home
