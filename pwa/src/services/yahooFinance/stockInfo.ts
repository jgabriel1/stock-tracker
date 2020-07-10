import axios, { AxiosResponse } from 'axios'
import api from '../api'

import { BASE_API_URL, PROXY_URL } from './urls'

interface YahooResponseData {
    spark: {
        result: YahooStockResult[]
    }
}

interface YahooStockResult {
    response: [
        { meta: YahooStock }
    ]
}

export interface YahooStock {
    symbol: string
    currency: string
    regularMarketPrice: number
    chartPreviousClose: number
}

const parseResponse = (response: AxiosResponse<YahooResponseData>): Map<string, YahooStock> => {
    const { data } = response
    const results = data.spark.result

    // This mapping "enters" the json object simplifying the final result
    const stocksInfo = results.map((result: YahooStockResult) => (result.response[0].meta))

    return new Map(stocksInfo.map(stockInfo => [stockInfo.symbol, stockInfo]))
}

export const getStockInfo = async (tickerList: string[]): Promise<Map<string, YahooStock>> => {
    const params = {
        symbols: tickerList.join(','),
        range: '1d',
        interval: '1d',
    }

    try {
        const response = await axios.get(`${PROXY_URL}${BASE_API_URL}v7/finance/spark`, { params })

        return parseResponse(response)
    }
    catch {
        try {
            const backupResponse = await api.get('yahoo-proxy/info', { params })

            return parseResponse(backupResponse)
        }
        catch (error) {
            alert(error)
            return new Map()
        }
    }
}

export const getSingleStockInfo = async (ticker: string): Promise<YahooStock> => {
    const mapping = await getStockInfo([ticker])

    return mapping.get(ticker) as YahooStock
}

