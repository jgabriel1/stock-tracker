import { DataState } from "./types";
import { Stock } from "../services/api/types";

interface StockData {
    ticker: string
    average_bought_price: number
    currently_owned_shares: number
    regularMarketPrice?: number
}

export const getBackendData = (state: DataState, ticker: string) => state.stocksData.get(ticker)

export const getYahooData = (state: DataState, ticker: string) => state.yahooData.get(ticker)

export const getStockData = (state: DataState, ticker: string): StockData => {
    // it is guaranteed that the stock data will always be loaded
    const backendData = getBackendData(state, ticker) as Stock
    const yahooData = getYahooData(state, ticker)

    return {
        ticker: backendData.ticker,
        average_bought_price: backendData.average_bought_price,
        currently_owned_shares: backendData.currently_owned_shares,
        regularMarketPrice: yahooData?.regularMarketPrice,
    }
}

export const getAllTickers = (state: DataState) => Array.from(state.stocksData.keys())

export const getAllStocksData = (state: DataState): StockData[] => (
    getAllTickers(state).map(ticker => getStockData(state, ticker))
)

export const getTotalInvested = (state: DataState) => (
    getAllStocksData(state).reduce((accum, stock) => (
        accum + stock.currently_owned_shares * stock.average_bought_price
    ), 0)
)

export const getCurrentWorth = (state: DataState) => (
    state.isYahooDataReady
        ? getAllStocksData(state).reduce((accum, stock) => (
            !stock.regularMarketPrice
                ? accum
                : accum + stock.currently_owned_shares * stock.regularMarketPrice
        ), 0)
        : 0
)

export const getTotalInvestedPerTicker = (state: DataState, ticker: string) => {
    const stockData = getStockData(state, ticker)
    return stockData.average_bought_price * stockData.currently_owned_shares
}

export const getCurrentWorthPerTicker = (state: DataState, ticker: string) => {
    const stockData = getStockData(state, ticker)

    if (stockData.regularMarketPrice) {
        return stockData.currently_owned_shares * stockData.regularMarketPrice
    } else {
        return 0
    }
}

export const getPotentialProfitPerTicker = (state: DataState, ticker: string) => {
    const totalInvested = getTotalInvestedPerTicker(state, ticker)
    const currentWorth = getCurrentWorthPerTicker(state, ticker)

    return currentWorth !== 0 ? currentWorth - totalInvested : 0
}
