import axios from 'axios'

import { BACKEND_API_URL } from './config'

const api = axios.create({
  baseURL: BACKEND_API_URL,
})

export default api
