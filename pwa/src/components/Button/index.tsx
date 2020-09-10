import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native'

import styles from './styles'

interface ButtonProps {
  text: string
  onPress: (event: GestureResponderEvent) => void
}

const Button: React.FC<ButtonProps> = ({ text, onPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Button
