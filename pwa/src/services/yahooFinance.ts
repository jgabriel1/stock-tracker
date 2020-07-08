import axios, { AxiosResponse } from 'axios'

const YAHOO_API_URL = 'https://query1.finance.yahoo.com/v7/finance/spark'

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

const parseResponse = (response: AxiosResponse<YahooResponseData>): YahooStock[] => {
    const { data } = response
    const results = data.spark.result

    // This mapping "enters" the json object simplifying the final result
    const stocksInfo = results.map((result: YahooStockResult) => (result.response[0].meta))

    return stocksInfo
}

export const getStockInfo = async (tickerList: string[]): Promise<YahooStock[]> => {
    const params = {
        symbols: tickerList.join(','),
        range: '1d',
        interval: '1d',
        // corsDomain: 'finance.yahoo.com',
    }

    const response = await axios.get(YAHOO_API_URL, { params })

    return parseResponse(response)
}
