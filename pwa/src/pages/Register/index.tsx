import React, { useState, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'

import Button from '../../components/Button'
import KeyboardView from '../../components/KeyboardView'
import ReturnButton from '../../components/ReturnButton'
import Input from '../../components/Input'

import useAPI from '../../services/api'

import { Header, Title, Content, FieldSet } from './styles'

const Register: React.FC = () => {
  const { postAuthRegister } = useAPI()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  const handleSubmitRegistration = useCallback(async () => {
    await postAuthRegister({
      username,
      email,
      password,
    })

    navigation.navigate('Login')
  }, [email, navigation, password, postAuthRegister, username])

  return (
    <KeyboardView>
      <Header>
        <ReturnButton />
        <Title>Cadastro</Title>
      </Header>

      <Content>
        <FieldSet>
          <Input
            placeholder="Usuário"
            value={username}
            onChangeText={text => setUsername(text)}
            autoCapitalize="none"
          />

          <Input
            placeholder="E-mail"
            value={email}
            onChangeText={text => setEmail(text)}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Input
            placeholder="Senha"
            value={password}
            onChangeText={text => setPassword(text)}
            autoCapitalize="none"
            secureTextEntry
          />
        </FieldSet>

        <Button text="Enviar" onPress={handleSubmitRegistration} />
      </Content>
    </KeyboardView>
  )
}

export default Register
