import React from 'react'
import { StockInfo } from "../pages/Dashboard";
import { YahooStock } from "../services/yahooFinance/stockInfo";

export interface DataState {
    stocksData: Map<string, StockInfo>
    yahooData: Map<string, YahooStock>
}

export interface Action {
    type: string
    payload: Map<string, StockInfo | YahooStock>
}

export interface DataStateContext {
    state: DataState
    dispatch: React.Dispatch<Action>
}