import React from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { Container } from './styles'

const ReturnButton: React.FC = () => {
  const navigation = useNavigation()

  return (
    <Container onPress={navigation.goBack}>
      <Feather name="chevron-left" size={32} color="#000" />
    </Container>
  )
}

export default ReturnButton
