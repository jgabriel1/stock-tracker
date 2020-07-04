import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

const AppStack = createStackNavigator()

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator headerMode='none'>
                <AppStack.Screen name='Home' component={Home} />
                <AppStack.Screen name='Login' component={Login} />
                <AppStack.Screen name='Register' component={Register} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes
