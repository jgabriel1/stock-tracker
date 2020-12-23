import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Connection, createConnection } from 'typeorm'

import { migrations } from './migrations'
import { StockInfoModel, TransactionModel } from './entities'
import { StockInfosRepository, TransactionsRepository } from './repositories'

interface DatabaseConnectionContextData {
  transactionsRepository: TransactionsRepository
  stockInfosRepository: StockInfosRepository
}

const DatabaseConnectionContext = createContext<DatabaseConnectionContextData>(
  {} as DatabaseConnectionContextData,
)

export const DatabaseConnectionProvider: React.FC = ({ children }) => {
  const [connection, setConnection] = useState<Connection | null>(null)

  const connect = useCallback(async () => {
    const createdConnection = await createConnection({
      type: 'expo',
      database: 'stock_tracker_dev.db',
      driver: require('expo-sqlite'),
      migrations,
      entities: [StockInfoModel, TransactionModel],
      synchronize: false,
    })

    await createdConnection.runMigrations()

    setConnection(createdConnection)
  }, [])

  useEffect(() => {
    if (!connection) connect()
  }, [connect, connection])

  if (!connection) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <DatabaseConnectionContext.Provider
      value={{
        stockInfosRepository: new StockInfosRepository(connection),
        transactionsRepository: new TransactionsRepository(connection),
      }}
    >
      {children}
    </DatabaseConnectionContext.Provider>
  )
}

export function useDatabaseConnection() {
  return useContext(DatabaseConnectionContext)
}
