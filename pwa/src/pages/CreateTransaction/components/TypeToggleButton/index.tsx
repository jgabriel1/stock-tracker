import React, { useCallback, useMemo } from 'react'
import { Dimensions, TextStyle } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolateColors,
  EasingNode,
  useValue,
} from 'react-native-reanimated'
import { useNewTransaction } from '../../../../hooks/newTransaction'

import {
  Container,
  Content,
  TypeText,
  TypeTextBackgroundContainer,
  TypeBackgroundMovingBlock,
} from './styles'

const TOGGLE_BUTTON_OFFSET = (Dimensions.get('window').width - 60) / 2 - 1

const TypeToggleButton = () => {
  const { transactionType, toggleTransactionType } = useNewTransaction()

  const offset = useSharedValue(transactionType === 'income' ? 0 : 1)

  const colorShift = useValue<number>(transactionType === 'income' ? 0 : 1)

  const blockAnimatedStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(offset.value * TOGGLE_BUTTON_OFFSET, {
        duration: 200,
      }),
    }
  })

  const toggleButtonAnimation = useCallback(() => {
    offset.value = offset.value === 0 ? 1 : 0
  }, [offset.value])

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
