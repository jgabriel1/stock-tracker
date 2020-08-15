import { DataState } from "./types";

export const getBackendData = (state: DataState, ticker: string) => state.stocksData.get(ticker)

export const getYahooData = (state: DataState, ticker: string) => state.yahooData.get(ticker)

export const getStockData = (state: DataState, ticker: string) => ({
    ...getBackendData(state, ticker),
    regularMarketPrice: getYahooData(state, ticker)?.regularMarketPrice,
})

export const getAllTickers = (state: DataState) => Array.from(state.stocksData.keys())

export const getAllStocksData = (state: DataState) => getAllTickers(state).map(ticker => getStockData(state, ticker))