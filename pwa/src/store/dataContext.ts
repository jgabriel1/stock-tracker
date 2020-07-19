import { createContext } from 'react'
import { DataStateContext } from './types'

const DataContext = createContext<DataStateContext>({} as DataStateContext)

export default DataContext