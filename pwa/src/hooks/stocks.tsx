import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import { api } from '../services/api'
import { getStockInfo } from '../services/yahooFinance/stockInfo'

interface BackendData {
  ticker: string
  fullName: string
  currentlyOwnedShares: number
  averageBoughtPrice: number
}

interface BackendResponse {
  stocks: {
    [ticker: string]: BackendData
  }
}

interface ExternalData {
  symbol: string
  regularMarketPrice: number
  chartPreviousClose: number
}

interface StockData extends BackendData, Partial<ExternalData> {
  currentWorth?: number
  totalInvested?: number
}

// interface ChartData {
//   x: string
//   y: number
// }

interface StocksContextData {
  stocksData: StockData[]
  tickers: string[]
  totalInvested: number
  currentWorth: number
  // currentWorthChartData: ChartData[]

  loadBackendData(): Promise<void>
  loadExternalData(): Promise<void>
}

const StocksContext = createContext<StocksContextData>({} as StocksContextData)

export const StocksProvider: React.FC = ({ children }) => {
  const [backendData, setBackendData] = useState<Map<string, BackendData>>(
    new Map(),
  )

  const [externalData, setExternalData] = useState<Map<string, ExternalData>>(
    new Map(),
  )

  const tickers = useMemo(() => {
    return Array.from(backendData.keys())
  }, [backendData])

  const stocksData = useMemo(() => {
    return tickers.map(ticker => {
      const backend = backendData.get(ticker) as BackendData
      const external = externalData.get(ticker)

      const totalInvested =
        backend.currentlyOwnedShares * backend.averageBoughtPrice

      const regularMarketPrice = external ? external.regularMarketPrice : 0
      const currentWorth = regularMarketPrice * backend.currentlyOwnedShares

      return {
        // General backend data:
        ticker,
        fullName: backend.fullName,

        // Backend data only dependent:
        currentlyOwnedShares: backend.currentlyOwnedShares,
        averageBoughtPrice: backend.averageBoughtPrice,
        totalInvested,

        // External data dependent:
        regularMarketPrice,
        currentWorth,
      }
    })
  }, [backendData, externalData, tickers])

  const totalInvested = useMemo(() => {
    return stocksData.reduce((accum, stock) => accum + stock.totalInvested, 0)
  }, [stocksData])

  const currentWorth = useMemo(() => {
    return stocksData.reduce((accum, stock) => accum + stock.currentWorth, 0)
  }, [stocksData])

  const loadBackendData = useCallback(async () => {
    const response = await api.get<BackendResponse>('stocks')

    const { stocks } = response.data

    const stocksMap = new Map(Object.entries(stocks))

    setBackendData(stocksMap)
  }, [])

  const loadExternalData = useCallback(async () => {
    const data = await getStockInfo(tickers)

    setExternalData(data)
  }, [tickers])

  return (
    <StocksContext.Provider
      value={{
        tickers,
        stocksData,
        totalInvested,
        currentWorth,
        loadBackendData,
        loadExternalData,
      }}
    >
      {children}
    </StocksContext.Provider>
  )
}

export function useStocks(): StocksContextData {
  const context = useContext(StocksContext)

  return context
}
