import axios from 'axios'

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

function setClientAuthToken(token: string): void {
  client.defaults.headers.authorization = token
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
  const loginForm = new FormData()

  loginForm.append('username', username)
  loginForm.append('password', password)

  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }

  const response = await client.post<IApiAuthTokenResponse>(
    'auth/token',
    loginForm,
    { headers },
  )

  const { access_token } = response.data

  return {
    token: access_token,
  }
}

export default function useAPI() {
  return {
    setClientAuthToken,
    postAuthRegister,
    postAuthToken,
  }
}
