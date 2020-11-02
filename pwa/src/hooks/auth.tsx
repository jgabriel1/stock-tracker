import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import useAPI from '../services/api'

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
  const { setClientAuthHeader, postAuthToken } = useAPI()

  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStoredToken(): Promise<void> {
      const storedToken = await AsyncStorage.getItem('@StockTracker:token')

      if (storedToken) {
        setClientAuthHeader(storedToken)
        setToken(storedToken)
      }

      setLoading(false)
    }

    loadStoredToken()
  }, [setClientAuthHeader])

  const signIn = useCallback(
    async ({ username, password }: SignInCredentials) => {
      try {
        const { token: access_token } = await postAuthToken({
          username,
          password,
        })

        await AsyncStorage.setItem('@StockTracker:token', access_token)

        setClientAuthHeader(access_token)

        setToken(access_token)
      } catch (error) {
        Alert.alert(`There was an error loggin in: ${error.message}`)
      }
    },
    [postAuthToken, setClientAuthHeader],
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
