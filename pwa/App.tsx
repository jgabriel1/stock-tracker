import React from 'react'
import { StatusBar } from 'react-native'

import Routes from './src/routes/AppStack'
import AppProvider from './src/hooks'

const App: React.FC = () => {
  return (
    <AppProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ededed"
        translucent
      />
      <Routes />
    </AppProvider>
  )
}

export default App
