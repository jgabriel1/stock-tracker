import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import NewTransaction from '../pages/NewTransaction'
import Detail from '../pages/Detail'

import DashboardTabs from './DashboardTabs'

export type AppStackParamList = {
  Dashboard: undefined
  Detail: {
    ticker: string
  }
  NewTransaction: undefined
}

const { Navigator, Screen } = createStackNavigator<AppStackParamList>()

const AppStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: '#ededed',
          },
        }}
      >
        <Screen name="Dashboard" component={DashboardTabs} />

        <Screen name="NewTransaction" component={NewTransaction} />
        <Screen name="Detail" component={Detail} />
      </Navigator>
    </NavigationContainer>
  )
}

export default AppStack
