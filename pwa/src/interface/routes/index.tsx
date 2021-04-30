import React, { useCallback, useEffect, useState } from 'react'
import { AppLoading } from 'expo'
import { View } from 'react-native'

import AppStack from './AppStack'
import AuthStack from './AuthStack'

import { useAuth } from '../hooks/auth'

import useAPI from '../services/api'
import useExternalData from '../services/externalData'

const Routes: React.FC = () => {
  const { token, loading } = useAuth()

  const { pingServer: pingAPI } = useAPI()
  const { pingServer: pingExternalData } = useExternalData()

  const [backendsReady, setBackendsReady] = useState(false)

  const pingBackends = useCallback(async () => {
    await Promise.all([pingAPI(), pingExternalData()])
  }, [pingAPI, pingExternalData])

  useEffect(() => {
    pingBackends().then(() => {
      setBackendsReady(true)
    })
  }, [pingBackends])

  if (loading || !backendsReady) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <AppLoading onError={alert} />
      </View>
    )
  }

  return token ? <AppStack /> : <AuthStack />
}

export default Routes
