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
import { useStocks } from '../../hooks/stocks'

const NewTransaction: React.FC = () => {
  const { resetTransactionState, submitCreateTransaction } = useNewTransaction()
  const { loadBackendData } = useStocks()

  const [quantity, setQuantity] = useState('')
  const [totalValue, setTotalValue] = useState('')

  const navigation = useNavigation()

  const navigateToStocksList = useCallback(() => {
    navigation.reset({
      routes: [{ name: 'Dashboard', params: { screen: 'StocksList' } }],
      index: 0,
    })
  }, [navigation])

  const handleSubmitTransactionForm = useCallback(async () => {
    await submitCreateTransaction({
      quantity: Number(quantity),
      totalValue: Number(totalValue),
    })

    await loadBackendData()

    navigateToStocksList()
  }, [
    loadBackendData,
    navigateToStocksList,
    quantity,
    totalValue,
    submitCreateTransaction,
  ])

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

        <Button text="Cadastrar" onPress={handleSubmitTransactionForm} />
      </Content>
    </Container>
  )
}

export default NewTransaction
