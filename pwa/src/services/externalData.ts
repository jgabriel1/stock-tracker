import axios from 'axios'

import { EXTERNAL_DATA_CLIENT } from './config'

interface IExternalSearch {
  symbol: string
  exchange: string
  longname?: string
  typeDisp?: string
}

interface IExternalSearchResponse {
  data: Array<IExternalSearch>
}

interface IExternalInfo {
  symbol: string
  currency: string
  regularMarketPrice: number
  chartPreviousClose: number
}

interface IExternalInfoResponse {
  data: Map<string, IExternalInfo>
}

const client = axios.create({
  baseURL: EXTERNAL_DATA_CLIENT,
})

async function getSearch(query: string): Promise<IExternalSearch[]> {
  const params = {
    query,
  }

  const response = await client.get<IExternalSearchResponse>('search', {
    params,
  })

  return response.data.data
}

async function getInfo(tickers: string[]): Promise<Map<string, IExternalInfo>> {
  const params = {
    tickers: tickers.map(ticker => ticker.toUpperCase()).join(','),
  }

  const response = await client.get<IExternalInfoResponse>('info', {
    params,
  })

  return response.data.data
}

export default function useExternalData() {
  return {
    getSearch,
    getInfo,
  }
}
