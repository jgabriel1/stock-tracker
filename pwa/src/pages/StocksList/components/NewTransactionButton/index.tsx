import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'

import { Feather } from '@expo/vector-icons'

import { Container, ButtonText } from './styles'

const NewTransactionButton: React.FC = () => {
  const navigation = useNavigation()

  const handleNavigateToNewTransaction = useCallback(() => {
    navigation.navigate('NewTransaction')
  }, [navigation])

  return (
    <Container onPress={handleNavigateToNewTransaction}>
      <Feather name="plus" size={28} color="#fff" />
      <ButtonText>Nova Transação</ButtonText>
    </Container>
  )
}

export default NewTransactionButton
