import React, { useCallback, useEffect, useState } from 'react'
import { useNewTransaction } from '../../../../hooks/newTransaction'

import {
  Container,
  Content,
  TypeText,
  TypeTextBackgroundContainer,
} from './styles'

const TypeToggleButton = () => {
  const { transactionType, setTransactionType } = useNewTransaction()

  const [selectedType, setSelectedType] = useState<'income' | 'outcome'>(
    transactionType,
  )

  const handleToggleTransactionType = useCallback(() => {
    setSelectedType(current => {
      return current === 'income' ? 'outcome' : 'income'
    })
  }, [])

  useEffect(() => {
    setTransactionType(selectedType)
  }, [selectedType, setTransactionType])

  return (
    <Container onPress={handleToggleTransactionType}>
      <Content>
        <TypeTextBackgroundContainer
          isActive={selectedType === 'income'}
          side="left"
        >
          <TypeText isActive={selectedType === 'income'}>Entrada</TypeText>
        </TypeTextBackgroundContainer>
        <TypeTextBackgroundContainer
          isActive={selectedType === 'outcome'}
          side="right"
        >
          <TypeText isActive={selectedType === 'outcome'}>Saída</TypeText>
        </TypeTextBackgroundContainer>
      </Content>
    </Container>
  )
}

export default TypeToggleButton
