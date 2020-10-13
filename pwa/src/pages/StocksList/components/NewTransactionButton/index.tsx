import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import { Feather } from '@expo/vector-icons'

import { AppStackParamList } from '../../../../routes/AppStack'

import { Container, ButtonText } from './styles'

const NewTransactionButton: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<AppStackParamList>>()

  function handleNavigateToNewTransaction() {
    navigation.navigate('NewTransaction', {})
  }

  return (
    <Container onPress={handleNavigateToNewTransaction}>
      <Feather name="plus" size={28} color="#fff" />
      <ButtonText>Nova Transação</ButtonText>
    </Container>
  )
}

export default NewTransactionButton
