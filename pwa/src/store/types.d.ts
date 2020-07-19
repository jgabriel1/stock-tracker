import React from 'react'
import { StockInfo } from "../pages/Dashboard";
import { YahooStock } from "../services/yahooFinance/stockInfo";

export interface DataState {
    stocksData: Map<string, StockInfo>
    isStocksDataReady: boolean
    yahooData: Map<string, YahooStock>
    isYahooDataReady: boolean
}

export interface Action {
    type: 'SET_STOCKS' | 'SET_YAHOO'
    payload: Map<string, StockInfo | YahooStock>
}

export interface DataStateContext {
    state: DataState
    dispatch: React.Dispatch<Action>
}