import React from 'react'
import useDataState from './useDataState'
import DataContext from './dataContext'

const DataStateProvider: React.FC = ({ children }) => (
  <DataContext.Provider value={useDataState()}>{children}</DataContext.Provider>
)

export default DataStateProvider
