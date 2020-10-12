import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { api } from '../services/api'
import { getStockInfo } from '../services/yahooFinance/stockInfo'

interface BackendData {
  ticker: string
  fullName?: string
  currently_owned_shares: number
  average_bought_price: number
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

interface StocksContextData {
  stocksData: StockData[]
  tickers: string[]
  totalInvested: number
  currentWorth: number

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
        backend.currently_owned_shares * backend.average_bought_price

      const regularMarketPrice = external ? external.regularMarketPrice : 0
      const currentWorth = regularMarketPrice * backend.currently_owned_shares

      return {
        // General backend data:
        ticker,
        fullName: backend.fullName || ticker,

        // Backend data only dependent:
        currently_owned_shares: backend.currently_owned_shares,
        average_bought_price: backend.average_bought_price,
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

  // create useEffect to handle fetching external data for loaded stocks.
  // this will ensure that the request will only be made when the state is actually
  // updated.
  useEffect(() => {
    if (tickers.length > 0) {
      getStockInfo(tickers).then(setExternalData)
    }
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
