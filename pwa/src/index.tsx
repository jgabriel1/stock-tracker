import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import Routes from './routes'
import AppProvider from './hooks'

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <AppProvider>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#ededed"
          translucent
        />
        <Routes />
      </AppProvider>
    </NavigationContainer>
  )
}

export default App
