import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import MainDashboard from '../pages/MainDashboard'
import StocksList from '../pages/StocksList'

const { Navigator, Screen } = createBottomTabNavigator()

const DashboardTabs = () => {
    return (
        <Navigator>
            <Screen name='MainDashboard' component={MainDashboard} />
            <Screen name='StocksList' component={StocksList} />
        </Navigator>
    )
}

export default DashboardTabs
