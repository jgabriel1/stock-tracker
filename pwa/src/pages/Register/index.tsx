import React, { useState, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'

import Button from '../../components/Button'
import KeyboardView from '../../components/KeyboardView'
import ReturnButton from '../../components/ReturnButton'

import API from '../../services/api'

import { Header, Title, Content, FieldSet } from './styles'
import Input from '../../components/Input'

const Register: React.FC = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  const handleSubmitRegistration = useCallback(() => {
    API.postRegister(username, email, password).then(() =>
      navigation.navigate('Login'),
    )
  }, [email, navigation, password, username])

  return (
    <KeyboardView>
      <Header>
        <ReturnButton />
        <Title>Cadastro</Title>
      </Header>

      <Content>
        <FieldSet>
          <Input
            placeholder="Username"
            value={username}
            onChangeText={text => setUsername(text)}
            autoCapitalize="none"
          />

          <Input
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Input
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            autoCapitalize="none"
            secureTextEntry
          />
        </FieldSet>

        <Button text="Register" onPress={handleSubmitRegistration} />
      </Content>
    </KeyboardView>
  )
}

export default Register
