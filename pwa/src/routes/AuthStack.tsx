import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'

const { Navigator, Screen } = createStackNavigator()

const AuthRotues: React.FC = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: '#ededed',
      },
    }}
  >
    <Screen name="Home" component={Home} />
    <Screen name="Login" component={Login} />
    <Screen name="Register" component={Register} />
  </Navigator>
)

export default AuthRotues
