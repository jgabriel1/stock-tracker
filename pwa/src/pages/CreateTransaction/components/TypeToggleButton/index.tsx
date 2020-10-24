import React, { useCallback } from 'react'
import { useNewTransaction } from '../../../../hooks/newTransaction'

import {
  Container,
  Content,
  TypeText,
  TypeTextBackgroundContainer,
  TypeBackgroundMovingBlock,
} from './styles'

const TypeToggleButton = () => {
  const { transactionType, toggleTransactionType } = useNewTransaction()

  const handleToggleTransactionType = useCallback(() => {
    toggleTransactionType()
  }, [toggleTransactionType])

  return (
    <Container onPress={handleToggleTransactionType}>
      <Content>
        <TypeBackgroundMovingBlock isActive={transactionType === 'income'} />
        <TypeTextBackgroundContainer>
          <TypeText isActive={transactionType === 'income'}>Entrada</TypeText>
        </TypeTextBackgroundContainer>
        <TypeTextBackgroundContainer>
          <TypeText isActive={transactionType === 'outcome'}>Saída</TypeText>
        </TypeTextBackgroundContainer>
      </Content>
    </Container>
  )
}

export default TypeToggleButton
