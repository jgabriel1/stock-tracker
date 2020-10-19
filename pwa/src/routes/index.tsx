import React from 'react'
import { AppLoading } from 'expo'
import { View } from 'react-native'

import AppStack from './AppStack'
import AuthStack from './AuthStack'

import { useAuth } from '../hooks/auth'

const Routes: React.FC = () => {
  const { token, loading } = useAuth()

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <AppLoading onError={alert} />
      </View>
    )
  }

  return token ? <AppStack /> : <AuthStack />
}

export default Routes
