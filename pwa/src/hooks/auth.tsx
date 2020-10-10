import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import { api } from '../services/api'

interface SignInCredentials {
  username: string
  password: string
}

interface AuthContextData {
  token: string
  loading: boolean
  signIn(credentials: SignInCredentials): Promise<void>
  signOut(): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStoredToken(): Promise<void> {
      const storedToken = await AsyncStorage.getItem('@StockTracker:token')

      if (storedToken) {
        api.defaults.headers.authorization = `Bearer ${storedToken}`

        setToken(storedToken)
      }

      setLoading(false)
    }

    loadStoredToken()
  }, [])

  const signIn = useCallback(
    async ({ username, password }: SignInCredentials) => {
      const loginForm = new FormData()

      loginForm.append('username', username)
      loginForm.append('password', password)

      const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }

      try {
        const response = await api.post('auth/token', loginForm, { headers })

        const { access_token } = response.data

        await AsyncStorage.setItem('@StockTracker:token', access_token)

        api.defaults.headers.authorization = `Bearer ${access_token}`

        setToken(access_token)
      } catch (error) {
        Alert.alert(`There was an error loggin in: ${error.message}`)
      }
    },
    [],
  )

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('@StockTracker:token')

    setToken('')
  }, [])

  return (
    <AuthContext.Provider value={{ token, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  return context
}
