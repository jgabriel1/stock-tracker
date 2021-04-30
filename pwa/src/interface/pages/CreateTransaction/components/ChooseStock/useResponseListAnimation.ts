import { useCallback } from 'react'
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

export default function useResponseListAnimation() {
  const responseListAnimationHeight = useSharedValue(-1000)

  const responseListMarginAnimationStyle = useAnimatedStyle(() => {
    const marginTop = withTiming(responseListAnimationHeight.value, {
      duration: 200,
      easing: Easing.quad,
    })

    return {
      marginTop,
    }
  })

  const fireResponseListDropAnimation = useCallback(
    (action: 'OPEN' | 'CLOSE') => {
      switch (action) {
        case 'OPEN':
          responseListAnimationHeight.value = 0
          break
        case 'CLOSE':
        default:
          responseListAnimationHeight.value = -1000
          break
      }
    },
    [responseListAnimationHeight.value],
  )

  return {
    responseListMarginAnimationStyle,
    fireResponseListDropAnimation,
  }
}
