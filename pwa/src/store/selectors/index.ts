import { DataState } from '../types'
import { Stock } from '../../services/api/types'

interface StockData {
  ticker: string
  average_bought_price: number
  currently_owned_shares: number
  totalInvested: number
  regularMarketPrice: number
  currentWorth: number
}

export const getBackendData = (state: DataState, ticker: string) =>
  state.stocksData.get(ticker)

export const getYahooData = (state: DataState, ticker: string) =>
  state.yahooData.get(ticker)

export const getStockData = (state: DataState, ticker: string): StockData => {
  // it is guaranteed that the stock data will always be loaded
  const { currently_owned_shares, average_bought_price } = getBackendData(
    state,
    ticker,
  ) as Stock

  const yahooData = getYahooData(state, ticker)
  const regularMarketPrice = yahooData?.regularMarketPrice

  const dependentData = regularMarketPrice
    ? {
      regularMarketPrice,
      currentWorth: regularMarketPrice * currently_owned_shares,
    }
    : {
      regularMarketPrice: 0,
      currentWorth: 0,
    }

  return {
    ticker,
    average_bought_price,
    currently_owned_shares,
    totalInvested: currently_owned_shares * average_bought_price,
    ...dependentData,
  }
}

export const getAllTickers = (state: DataState) =>
  Array.from(state.stocksData.keys())

export const getAllStocksData = (state: DataState): StockData[] =>
  getAllTickers(state).map(ticker => getStockData(state, ticker))

export const getTotalInvested = (state: DataState) =>
  getAllStocksData(state).reduce(
    (accum, stock) => accum + stock.totalInvested,
    0,
  )

export const getCurrentWorth = (state: DataState) =>
  state.isYahooDataReady
    ? getAllStocksData(state).reduce(
        (accum, stock) =>
          !stock.regularMarketPrice ? accum : accum + stock.currentWorth,
        0,
      )
    : 0

export const getTotalInvestedPerTicker = (state: DataState, ticker: string) => {
  const stockData = getStockData(state, ticker)
  return stockData.average_bought_price * stockData.currently_owned_shares
}

export const getCurrentWorthPerTicker = (state: DataState, ticker: string) => {
  const stockData = getStockData(state, ticker)

  if (stockData.regularMarketPrice) {
    return stockData.currently_owned_shares * stockData.regularMarketPrice
  }
  return 0
}

export const getPotentialProfitPerTicker = (
  state: DataState,
  ticker: string,
) => {
  const totalInvested = getTotalInvestedPerTicker(state, ticker)
  const currentWorth = getCurrentWorthPerTicker(state, ticker)

  return currentWorth !== 0 ? currentWorth - totalInvested : 0
}

export function getCurrentWorthChartData(state: DataState) {
  const stocks = getAllStocksData(state).sort((a, b) => {
    return a.currentWorth && b.currentWorth
      ? a.currentWorth - b.currentWorth
      : 1
  })

  const chartDataMap = new Map<string, number>()

  stocks.forEach(stock => {
    const { currentWorth } = stock

    if (chartDataMap.size <= 5) {
      chartDataMap.set(stock.ticker, currentWorth)
    } else if (chartDataMap.has('other')) {
      const accumulated = chartDataMap.get('other') as number
      chartDataMap.set('other', accumulated + currentWorth)
    } else {
      chartDataMap.set('other', currentWorth)
    }
  })

  const globalCurrentWorth = stocks.reduce((accum, { currentWorth }) => {
    return accum + currentWorth
  }, 0)

  return Array.from(chartDataMap.entries()).map(([ticker, currentWorth]) => {
    const percentValue = (100 * currentWorth) / globalCurrentWorth
    return {
      x: ticker,
      y: percentValue,
    }
  })
}
