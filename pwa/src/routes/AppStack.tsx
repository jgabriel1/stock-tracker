import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'

import NewTransaction from '../pages/NewTransaction'
import Detail from '../pages/Detail'

import DataStateProvider from '../store/DataStateProvider'
import DashboardTabs from './DashboardTabs'

export type AppStackParamList = {
  Home: undefined
  Login: undefined
  Register: undefined
  Dashboard: undefined
  Detail: {
    ticker: string
  }
  NewTransaction: {
    initialTicker?: string
    initialTransactionType?: 'IN' | 'OUT'
  }
}

const { Navigator, Screen } = createStackNavigator<AppStackParamList>()

const Routes: React.FC = () => {
  return (
    <DataStateProvider>
      <NavigationContainer>
        <Navigator headerMode="none">
          <Screen name="Home" component={Home} />
          <Screen name="Login" component={Login} />
          <Screen name="Register" component={Register} />

          <Screen name="Dashboard" component={DashboardTabs} />

          <Screen name="NewTransaction" component={NewTransaction} />
          <Screen name="Detail" component={Detail} />
        </Navigator>
      </NavigationContainer>
    </DataStateProvider>
  )
}

export default Routes
