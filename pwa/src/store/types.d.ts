import React from 'react'
import { Stock } from '../services/api/types'
import { YahooStock } from '../services/yahooFinance/stockInfo'

export interface DataState {
  stocksData: Map<string, Stock>
  isStocksDataReady: boolean
  yahooData: Map<string, YahooStock>
  isYahooDataReady: boolean
}

export interface Action {
  type: 'SET_STOCKS' | 'SET_YAHOO'
  payload: Map<string, Stock | YahooStock>
}

export interface DataStateContext {
  state: DataState
  dispatch: React.Dispatch<Action>
}
