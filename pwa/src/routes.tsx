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
    Dashboard: { loadData: boolean }
    Detail: { ticker: string }
    NewTransaction: undefined
}

const AppStack = createStackNavigator<AppStackParamList>()

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator headerMode='none'>
                <AppStack.Screen name='Home' component={Home} />
                <AppStack.Screen name='Login' component={Login} />
                <AppStack.Screen name='Register' component={Register} />

                <DataStateProvider>
                    <AppStack.Screen name='Dashboard' component={Dashboard} />
                    <AppStack.Screen name='NewTransaction' component={NewTransaction} />
                    <AppStack.Screen name='Detail' component={Detail} />
                </DataStateProvider>

            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes
