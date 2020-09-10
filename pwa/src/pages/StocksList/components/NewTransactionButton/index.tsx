import React from 'react'
import { Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import { Feather } from '@expo/vector-icons'

import { AppStackParamList } from '../../../../routes/AppStack'

import styles from './styles'

const NewTransactionButton: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<AppStackParamList>>()

  function handleNavigateToNewTransaction() {
    navigation.navigate('NewTransaction', {})
  }

  return (
    <RectButton
      style={styles.buttonContainer}
      onPress={handleNavigateToNewTransaction}
    >
      <View style={styles.buttonIconContainer}>
        <Feather name="plus" size={32} color="#fff" />
      </View>
      <View style={styles.buttonTextContainer}>
        <Text style={styles.buttonText}>New Transaction</Text>
      </View>
    </RectButton>
  )
}

export default NewTransactionButton
