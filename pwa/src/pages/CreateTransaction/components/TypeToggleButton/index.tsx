import React, { useCallback } from 'react'

import { useNewTransaction } from '../../../../hooks/newTransaction'
import useToggleButtonAnimation from './useToggleButtonAnimation'
import useTextColorShiftAnimation from './useTextColorShiftAnimation'

import {
  Container,
  Content,
  TypeText,
  TypeTextBackgroundContainer,
  TypeBackgroundMovingBlock,
} from './styles'

const TypeToggleButton = () => {
  const { transactionType, toggleTransactionType } = useNewTransaction()

  const {
    blockAnimatedStyle,
    toggleButtonAnimation,
  } = useToggleButtonAnimation(transactionType)

  const {
    incomeTextColorAnimatedStyle,
    outcomeTextColorAnimatedStyle,
    colorShiftAnimation,
  } = useTextColorShiftAnimation(transactionType)

  const handleToggleTransactionType = useCallback(() => {
    toggleTransactionType()
    colorShiftAnimation()
    toggleButtonAnimation()
  }, [colorShiftAnimation, toggleButtonAnimation, toggleTransactionType])

  return (
    <Container onPress={handleToggleTransactionType}>
      <Content>
        <TypeBackgroundMovingBlock style={blockAnimatedStyle} />

        <TypeTextBackgroundContainer>
          <TypeText style={incomeTextColorAnimatedStyle}>Entrada</TypeText>
        </TypeTextBackgroundContainer>

        <TypeTextBackgroundContainer>
          <TypeText style={outcomeTextColorAnimatedStyle}>Saída</TypeText>
        </TypeTextBackgroundContainer>
      </Content>
    </Container>
  )
}

export default TypeToggleButton
