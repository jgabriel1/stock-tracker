import AsyncStorage from '@react-native-community/async-storage'

export async function setAuthToken(token: string): Promise<void> {
  try {
    await AsyncStorage.setItem('token', token)
  } catch (error) {
    alert(error)
  }
}

export async function getAuthToken(): Promise<string> {
  try {
    const token = await AsyncStorage.getItem('token')

    if (token !== null) {
      return token
    }

    alert('No authentication token!')
    return ''
  } catch (error) {
    alert(error)
    return ''
  }
}
