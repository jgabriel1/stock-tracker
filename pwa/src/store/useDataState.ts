import { useReducer } from 'react'
import { DataState, Action } from './types'
import { StockInfo } from '../pages/Dashboard'
import { YahooStock } from '../services/yahooFinance/stockInfo'


const reducer = (state: DataState, action: Action): DataState => {
    switch (action.type) {
        case 'SET_STOCKS':
            return {
                ...state,
                stocksData: action.payload as Map<string, StockInfo>
            }
        case 'SET_YAHOO':
            return {
                ...state,
                yahooData: action.payload as Map<string, YahooStock>
            }
        default:
            return {
                ...state
            }
    }
}

const initialState = {
    stocksData: new Map(),
    yahooData: new Map(),
}

const useDataState = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return { state, dispatch }
}

export default useDataState