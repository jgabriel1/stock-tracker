import React from 'react'

import { AuthProvider } from './auth'
import { StocksProvider } from './stocks'

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <StocksProvider>{children}</StocksProvider>
    </AuthProvider>
  )
}

export default AppProvider
