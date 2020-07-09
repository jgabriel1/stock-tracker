import axios, { AxiosResponse } from 'axios'
import api from '../api'

import { BASE_API_URL, PROXY_URL } from './urls'

interface YahooSearchResponseData {
    quotes: Array<YahooSearchAnswers>
}

export interface YahooSearchAnswers {
    exchange: string
    symbol: string
    longname?: string
}

const parseSearchResponse = (response: AxiosResponse<YahooSearchResponseData>): YahooSearchAnswers[] => {
    return response.data.quotes
}

export const getSearchQuery = async (query: string): Promise<YahooSearchAnswers[]> => {
    const params = {
        q: query,
        quotesCount: 5,
        newsCount: 0,
        enableFuzzyQuery: false,
        enableEnhancedTrivialQuery: true
    }

    try {
        const response = await axios.get(`${PROXY_URL}${BASE_API_URL}v1/finance/search`, { params })

        return parseSearchResponse(response)
    }
    catch {
        try {
            const backupResponse = await api.get('yahoo-proxy/search', { params })

            return parseSearchResponse(backupResponse)
        }
        catch (error) {
            alert(error)

            return []
        }
    }
}
