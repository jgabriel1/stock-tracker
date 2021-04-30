import React from 'react'

import { AuthProvider } from './auth'
import { CacheProvider } from './cache'
import { NewTransactionProvider } from './newTransaction'
import { StocksProvider } from './stocks'

const AppProvider: React.FC = ({ children }) => {
  return (
    <CacheProvider>
      <AuthProvider>
        <StocksProvider>
          <NewTransactionProvider>{children}</NewTransactionProvider>
        </StocksProvider>
      </AuthProvider>
    </CacheProvider>
  )
}

export default AppProvider
