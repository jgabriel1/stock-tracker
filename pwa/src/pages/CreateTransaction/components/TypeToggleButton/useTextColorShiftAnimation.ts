import { useCallback, useMemo } from 'react'
import { TextStyle } from 'react-native'
import Animated, {
  EasingNode,
  interpolateColors,
  useValue,
} from 'react-native-reanimated'

export default function useTextColorShiftAnimation(
  transactionType: 'income' | 'outcome',
) {
  const colorShift = useValue<number>(transactionType === 'income' ? 0 : 1)

  const colorShiftAnimation = useCallback(() => {
    Animated.timing(colorShift, {
      toValue: transactionType === 'income' ? 1 : 0,
      duration: 150,
      easing: EasingNode.linear,
    }).start()
  }, [colorShift, transactionType])

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

  return {
    colorShiftAnimation,
    incomeTextColorAnimatedStyle,
    outcomeTextColorAnimatedStyle,
  }
}
