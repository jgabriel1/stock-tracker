import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import NewTransaction from './pages/NewTransaction'
import Detail from './pages/Detail'

import DataStateProvider from './store/DataStateProvider'

export type AppStackParamList = {
    Home: undefined
    Login: undefined
    Register: undefined
    Dashboard: undefined
    Detail: {
        ticker: string
    }
    NewTransaction: {
        initialTicker?: string,
        initialTransactionType?: 'IN' | 'OUT'
    }
}

const AppStack = createStackNavigator<AppStackParamList>()

const Routes = () => {
    return (
        <DataStateProvider>
            <NavigationContainer>
                <AppStack.Navigator headerMode='none'>
                    <AppStack.Screen name='Home' component={Home} />
                    <AppStack.Screen name='Login' component={Login} />
                    <AppStack.Screen name='Register' component={Register} />

                    <AppStack.Screen name='Dashboard' component={Dashboard} />
                    <AppStack.Screen name='NewTransaction' component={NewTransaction} />
                    <AppStack.Screen name='Detail' component={Detail} />
                </AppStack.Navigator>
            </NavigationContainer>
        </DataStateProvider>
    )
}

export default Routes
