import { useReducer } from 'react'
import { DataState, Action } from './types'
import { Stock } from '../services/api/types'
import { YahooStock } from '../services/yahooFinance/stockInfo'

const reducer = (state: DataState, action: Action): DataState => {
  switch (action.type) {
    case 'SET_STOCKS':
      return {
        ...state,
        stocksData: action.payload as Map<string, Stock>,
        isStocksDataReady: true,
        isYahooDataReady: false,
      }
    case 'SET_YAHOO':
      return {
        ...state,
        yahooData: action.payload as Map<string, YahooStock>,
        isYahooDataReady: true,
      }
    default:
      return {
        ...state,
      }
  }
}

const initialState = {
  stocksData: new Map(),
  isStocksDataReady: false,
  yahooData: new Map(),
  isYahooDataReady: false,
}

const useDataState = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return { state, dispatch }
}

export default useDataState
