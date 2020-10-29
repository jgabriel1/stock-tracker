import axios from 'axios'

import { EXTERNAL_DATA_CLIENT } from './config'

const externalData = axios.create({
  baseURL: EXTERNAL_DATA_CLIENT,
})

export default externalData
