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
          fontSize: 14,
          marginLeft: 16,
        },
        inactiveBackgroundColor: '#fafafc',
        activeBackgroundColor: '#ebebeb',
        inactiveTintColor: '#999',
        activeTintColor: '#000',
      }}
    >
      <Screen
        name="MainDashboard"
        component={MainDashboard}
        options={{
          tabBarLabel: 'Painel',
          tabBarIcon: ({ size, focused }) =>
            focused ? (
              <Icon name="monitor" size={size} color="#000" />
            ) : (
              <Icon name="monitor" size={size} color="#999" />
            ),
        }}
      />
      <Screen
        name="StocksList"
        component={StocksList}
        options={{
          tabBarLabel: 'Listagem',
          tabBarIcon: ({ size, focused }) =>
            focused ? (
              <Icon name="list" size={size} color="#000" />
            ) : (
              <Icon name="list" size={size} color="#999" />
            ),
        }}
      />
    </Navigator>
  )
}

export default DashboardTabs
