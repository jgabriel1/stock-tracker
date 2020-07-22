import axios, { AxiosResponse } from 'axios'

import { BASE_API_URL, PROXY_URL, BACKEND_PROXY_URL } from './urls'

interface YahooSearchResponseData {
    quotes: Array<YahooSearchAnswer>
}

export interface YahooSearchAnswer {
    exchange: string
    symbol: string
    longname?: string
    typeDisp?: string
}

const parseSearchResponse = (response: AxiosResponse<YahooSearchResponseData>): YahooSearchAnswer[] => {
    const parsed = response.data.quotes.map(answer => ({
        exchange: answer.exchange,
        symbol: answer.symbol,
        longname: answer.longname,
        typeDisp: answer.typeDisp,
    }))

    return parsed
}

export const getSearchQuery = async (query: string): Promise<YahooSearchAnswer[]> => {
    const params = {
        q: query,
        quotesCount: 5,
        newsCount: 0,
        enableFuzzyQuery: false,
        enableEnhancedTrivialQuery: true
    }

    try {
        const response = await axios.get(
            `${PROXY_URL}${BASE_API_URL}v1/finance/search`,
            { params }
        )

        return parseSearchResponse(response)
    }
    catch {
        try {
            const backupResponse = await axios.get(
                `${BACKEND_PROXY_URL}yahoo-proxy/search`,
                { params }
            )

            return parseSearchResponse(backupResponse)
        }
        catch (error) {
            alert(error)

            return []
        }
    }
}
