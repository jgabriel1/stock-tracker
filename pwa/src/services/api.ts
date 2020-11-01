import axios from 'axios'
import queryString from 'query-string'

import { BACKEND_API_URL } from './config'

const client = axios.create({
  baseURL: BACKEND_API_URL,
})

interface IApiAuthRegisterData {
  username: string
  password: string
  email: string
}

interface IApiAuthTokenData {
  username: string
  password: string
}

interface IApiAuthTokenResponse {
  access_token: string
}

interface IApiTransaction {
  _id: string
  value: number
  quantity: number
  type: 'income' | 'outcome'
  createdAt: string
  extraCosts?: number
}

interface IApiTransactionsResponse {
  transactions: Array<IApiTransaction>
}

interface IApiCreateTransactionData {
  type: 'income' | 'outcome'
  value: number
  quantity: number
  stockTicker: string
  stockFullName: string
}

interface IApiStock {
  stockId: string
  ticker: string
  fullName: string
  totalInvested: number
  currentlyOwnedShares: number
  averageBoughtPrice: number
}

interface IApiListStocksResponse {
  stocks: {
    [key: string]: IApiStock
  }
}

function setClientAuthHeader(token: string): void {
  client.defaults.headers.authorization = `Bearer ${token}`
}

async function postAuthRegister({
  username,
  password,
  email,
}: IApiAuthRegisterData): Promise<void> {
  const data = {
    username,
    password,
    email,
  }

  await client.post('auth/register', data)
}

async function postAuthToken({ username, password }: IApiAuthTokenData) {
  const data = queryString.stringify({
    username,
    password,
  })

  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }

  const response = await client.post<IApiAuthTokenResponse>(
    'auth/token',
    data,
    { headers },
  )

  const { access_token } = response.data

  return {
    token: access_token,
  }
}

async function getTransactions(ticker: string) {
  const params = {
    ticker: ticker.toUpperCase(),
    to: new Date().toISOString(),
  }

  const response = await client.get<IApiTransactionsResponse>('transactions', {
    params,
  })

  return response.data.transactions
}

async function postTransactions({
  type,
  value,
  quantity,
  stockTicker,
  stockFullName,
}: IApiCreateTransactionData): Promise<void> {
  const data = {
    type,
    value,
    quantity,
    stockTicker,
    stockFullName,
  }

  await client.post('transactions', data)
}

async function getStocks(): Promise<Map<string, IApiStock>> {
  const response = await client.get<IApiListStocksResponse>('stocks')

  const stocks = new Map(Object.entries(response.data.stocks))

  return stocks
}

export default function useAPI() {
  return {
    setClientAuthHeader,
    postAuthRegister,
    postAuthToken,
    getTransactions,
    postTransactions,
    getStocks,
  }
}
