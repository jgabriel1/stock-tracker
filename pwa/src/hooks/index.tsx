import React from 'react'

import { AuthProvider } from './auth'
import { NewTransactionProvider } from './newTransaction'
import { StocksProvider } from './stocks'

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <StocksProvider>
        <NewTransactionProvider>{children}</NewTransactionProvider>
      </StocksProvider>
    </AuthProvider>
  )
}

export default AppProvider
