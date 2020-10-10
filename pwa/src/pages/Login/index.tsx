import React, { useState, useContext, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'

import Button from '../../components/Button'
import KeyboardView from '../../components/KeyboardView'
import ReturnButton from '../../components/ReturnButton'
import Input from '../../components/Input'

import API from '../../services/api'
import * as Yahoo from '../../services/yahooFinance/stockInfo'
import DataContext from '../../store/dataContext'

import { Header, Title, Content, FieldSet } from './styles'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { dispatch } = useContext(DataContext)

  const navigation = useNavigation()

  const handleSubmitLogin = useCallback(async () => {
    await API.postLogin(username, password)

    const stocks = await API.getStocksData()
    dispatch({ type: 'SET_STOCKS', payload: stocks })

    navigation.navigate('Dashboard')

    const tickers = Array.from(stocks.keys())
    const yahooStocks = await Yahoo.getStockInfo(tickers)
    dispatch({ type: 'SET_YAHOO', payload: yahooStocks })
  }, [dispatch, navigation, password, username])

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
