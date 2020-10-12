import React, { useState, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'

import Button from '../../components/Button'
import KeyboardView from '../../components/KeyboardView'
import ReturnButton from '../../components/ReturnButton'
import Input from '../../components/Input'

import { Header, Title, Content, FieldSet } from './styles'
import { useAuth } from '../../hooks/auth'
import { useStocks } from '../../hooks/stocks'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useAuth()
  const { loadBackendData } = useStocks()

  const navigation = useNavigation()

  const handleSubmitLogin = useCallback(async () => {
    await signIn({ username, password })

    // Preload stocks data:
    await loadBackendData()

    navigation.navigate('Dashboard')
  }, [loadBackendData, navigation, password, signIn, username])

  return (
    <KeyboardView>
      <Header>
        <ReturnButton />
        <Title>Login</Title>
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
            placeholder="Senha"
            value={password}
            onChangeText={text => setPassword(text)}
            autoCapitalize="none"
            secureTextEntry
          />
        </FieldSet>

        <Button text="Entrar" onPress={handleSubmitLogin} />
      </Content>
    </KeyboardView>
  )
}

export default Login
