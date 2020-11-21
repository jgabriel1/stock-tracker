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
  data: {
    [ticker: string]: IExternalInfo
  }
}

interface IExternalChartData {
  symbol: string
  timestamp: number[]
  close: number[]
}

interface IExternalChartDataResponse {
  data: IExternalChartData
}

interface IExternalChartDataOptions {
  range?: string
  numberOfPoints?: number
}

const client = axios.create({
  baseURL: EXTERNAL_DATA_CLIENT,
})

async function pingServer(): Promise<void> {
  await client.get('/')
}

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

  const info = new Map(Object.entries(response.data.data))

  return info
}

async function getChartData(
  ticker: string,
  { numberOfPoints, range }: IExternalChartDataOptions = {},
): Promise<IExternalChartData> {
  const params = {
    range,
    numberOfPoints,
  }

  const response = await client.get<IExternalChartDataResponse>(
    `chart/${ticker.toUpperCase()}`,
    { params },
  )

  const chartData = response.data.data

  return chartData
}

export default function useExternalData() {
  return {
    pingServer,
    getSearch,
    getInfo,
    getChartData,
  }
}
