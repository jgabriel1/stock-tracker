import React from 'react'
import { Platform } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather as Icon } from '@expo/vector-icons'

import MainDashboard from '../pages/MainDashboard'
import StocksList from '../pages/StocksList'

const { Navigator, Screen } = createBottomTabNavigator()

const DashboardTabs: React.FC = () => {
  return (
    <Navigator
      tabBarOptions={{
        style: {
          elevation: 0,
          shadowOpacity: 0,
        },
        tabStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconStyle: {
          flex: 0,
          width: 20,
          height: Platform.OS === 'ios' ? 24 : 20,
        },
        labelStyle: {
          fontSize: 13,
          marginLeft: 16,
        },
        inactiveBackgroundColor: '#fafafc',
        activeBackgroundColor: '#ebebeb',
        inactiveTintColor: '#cccccc',
        activeTintColor: '#32264d',
      }}
    >
      <Screen
        name="MainDashboard"
        component={MainDashboard}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ size }) => <Icon name="monitor" size={size} />,
        }}
      />
      <Screen
        name="StocksList"
        component={StocksList}
        options={{
          tabBarLabel: 'Stocks List',
          tabBarIcon: ({ size }) => <Icon name="list" size={size} />,
        }}
      />
    </Navigator>
  )
}

export default DashboardTabs
