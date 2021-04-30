import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import CreateTransaction from '../pages/CreateTransaction'
import Detail from '../pages/Detail'

import DashboardTabs from './DashboardTabs'

export type AppStackParamList = {
  Dashboard: undefined
  Detail: {
    ticker: string
  }
  CreateTransaction: undefined
}

const { Navigator, Screen } = createStackNavigator<AppStackParamList>()

const AppStack: React.FC = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#ededed',
        },
      }}
    >
      <Screen name="Dashboard" component={DashboardTabs} />

      <Screen name="CreateTransaction" component={CreateTransaction} />
      <Screen name="Detail" component={Detail} />
    </Navigator>
  )
}

export default AppStack
