import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import Routes from './routes'
import AppProvider from './hooks'
import { DatabaseConnectionProvider } from './data/connection'

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <DatabaseConnectionProvider>
        <AppProvider>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="#ededed"
            translucent
          />
          <Routes />
        </AppProvider>
      </DatabaseConnectionProvider>
    </NavigationContainer>
  )
}

export default App
