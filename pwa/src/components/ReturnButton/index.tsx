import React from 'react'
import { TouchableOpacity, ViewStyle } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import defaultStyles from './styles'

interface ReturnButtonProps {
  style?: ViewStyle
}

const ReturnButton: React.FC<ReturnButtonProps> = ({ style }) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={navigation.goBack}
      style={{ ...defaultStyles.button, ...style }}
    >
      <Feather name="arrow-left" size={32} color="#000" />
    </TouchableOpacity>
  )
}

export default ReturnButton
