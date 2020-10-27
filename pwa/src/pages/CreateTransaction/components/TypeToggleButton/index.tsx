import React, { useCallback, useMemo } from 'react'
import { TextStyle } from 'react-native'
import Animated, {
  interpolateColors,
  EasingNode,
  useValue,
} from 'react-native-reanimated'

import { useNewTransaction } from '../../../../hooks/newTransaction'
import useToggleButtonAnimation from './useToggleButtonAnimation'

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

  const colorShift = useValue<number>(transactionType === 'income' ? 0 : 1)

  const colorShiftAnimation = useCallback(() => {
    Animated.timing(colorShift, {
      toValue: transactionType === 'income' ? 1 : 0,
      duration: 150,
      easing: EasingNode.linear,
    }).start()
  }, [colorShift, transactionType])

  const handleToggleTransactionType = useCallback(() => {
    toggleTransactionType()
    colorShiftAnimation()
    toggleButtonAnimation()
  }, [colorShiftAnimation, toggleButtonAnimation, toggleTransactionType])

  const incomeTextColorAnimatedStyle = useMemo(() => {
    return ({
      color: interpolateColors(colorShift, {
        inputRange: [0, 1],
        outputColorRange: ['rgb(237,237,237)', 'rgb(59,59,59)'],
      }),
    } as unknown) as TextStyle
  }, [colorShift])

  const outcomeTextColorAnimatedStyle = useMemo(() => {
    return ({
      color: interpolateColors(colorShift, {
        inputRange: [0, 1],
        outputColorRange: ['rgb(59,59,59)', 'rgb(237,237,237)'],
      }),
    } as unknown) as TextStyle
  }, [colorShift])

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
