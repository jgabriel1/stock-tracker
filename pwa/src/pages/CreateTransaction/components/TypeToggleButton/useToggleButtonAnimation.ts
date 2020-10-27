import { useCallback } from 'react'
import { Dimensions } from 'react-native'
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

// This is the amount that the button will translate when it moves:
// (total screen width) - (2x30px padding each side) / 2 - (1px button border)
const TOGGLE_BUTTON_OFFSET = (Dimensions.get('window').width - 60) / 2 - 1

export default function useToggleButtonAnimation(
  transactionType: 'income' | 'outcome',
) {
  const offset = useSharedValue(transactionType === 'income' ? 0 : 1)

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

  return {
    blockAnimatedStyle,
    toggleButtonAnimation,
  }
}
