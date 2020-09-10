import React, { useState } from 'react'
import { View, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Button from '../../components/Button'
import KeyboardView from '../../components/KeyboardView'
import ReturnButton from '../../components/ReturnButton'

import API from '../../services/api'

import styles from './styles'

const Register: React.FC = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  function handleSubmitRegistration() {
    API.postRegister(username, email, password).then(() =>
      navigation.navigate('Login'),
    )
  }

  return (
    <KeyboardView>
      <ReturnButton />

      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={text => setUsername(text)}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          autoCapitalize="none"
          secureTextEntry
        />

        <Button text="Register" onPress={handleSubmitRegistration} />
      </View>
    </KeyboardView>
  )
}

export default Register
