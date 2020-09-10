import React from 'react'
import { Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Button from '../../components/Button'

import styles from './styles'

const Home: React.FC = () => {
  const navigation = useNavigation()

  function navigateToLogin() {
    navigation.navigate('Login')
  }

  function navigateToRegister() {
    navigation.navigate('Register')
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Stock Tracker</Text>
        <Text style={styles.titleDescription}>
          An app to track the stocks you own and project your gains.
        </Text>
      </View>

      <>
        <Button text="Login" onPress={navigateToLogin} />
        <Button text="Register" onPress={navigateToRegister} />
      </>
    </View>
  )
}

export default Home
