import React, { useCallback } from 'react'
import { useNewTransaction } from '../../../../hooks/newTransaction'

import {
  Container,
  Content,
  TypeText,
  TypeTextBackgroundContainer,
} from './styles'

const TypeToggleButton = () => {
  const { transactionType, toggleTransactionType } = useNewTransaction()

  const handleToggleTransactionType = useCallback(() => {
    toggleTransactionType()
  }, [toggleTransactionType])

  return (
    <Container onPress={handleToggleTransactionType}>
      <Content>
        <TypeTextBackgroundContainer
          isActive={transactionType === 'income'}
          side="left"
        >
          <TypeText isActive={transactionType === 'income'}>Entrada</TypeText>
        </TypeTextBackgroundContainer>
        <TypeTextBackgroundContainer
          isActive={transactionType === 'outcome'}
          side="right"
        >
          <TypeText isActive={transactionType === 'outcome'}>Saída</TypeText>
        </TypeTextBackgroundContainer>
      </Content>
    </Container>
  )
}

export default TypeToggleButton
