import React, { useState, useCallback, useEffect } from 'react'
import {
  useNavigation,
  StackActions,
  CommonActions,
} from '@react-navigation/native'

import { useNewTransaction } from '../../hooks/newTransaction'

import ChooseStock from './components/ChooseStock'
import TypeToggleButton from './components/TypeToggleButton'
import Input from '../../components/Input'
import Button from '../../components/Button'
import ReturnButton from '../../components/ReturnButton'

import lastValueOfArray from '../../utils/lastValueOfArray'

import { Container, Content, Header, Title } from './styles'

const NewTransaction: React.FC = () => {
  const { resetTransactionState } = useNewTransaction()

  const [quantity, setQuantity] = useState('')
  const [totalValue, setTotalValue] = useState('')

  const navigation = useNavigation()

  const navigateToStocksList = useCallback(() => {
    navigation.dispatch(state => {
      const lastRoute = lastValueOfArray(state.routeNames)

      if (lastRoute === 'Details') {
        return StackActions.pop(2) // always brings back to StocksList
      }

      return CommonActions.navigate('Dashboard', { screen: 'StocksList' })
    })
  }, [navigation])

  useEffect(() => {
    return navigation.addListener('blur', () => {
      resetTransactionState()
    })
  }, [navigation, resetTransactionState])

  return (
    <Container>
      <Header>
        <ReturnButton />

        <Title>Nova Transação</Title>
      </Header>

      <Content showsVerticalScrollIndicator={false}>
        <ChooseStock />

        <TypeToggleButton />

        <Input
          onChangeText={text => setQuantity(text)}
          autoCapitalize="none"
          placeholder="Quantidade"
          keyboardType="number-pad"
        />

        <Input
          onChangeText={text => setTotalValue(text)}
          autoCapitalize="none"
          placeholder="Valor total"
          keyboardType="number-pad"
        />

        <Button text="Cadastrar" onPress={() => {}} />
      </Content>
    </Container>
  )
}

export default NewTransaction
