import AsyncStorage from '@react-native-community/async-storage'

export const setAuthToken = async (token: string): Promise<void> => {
    try {
        await AsyncStorage.setItem('token', token)
    } catch (error) {
        alert(error)
    }
}

export const getAuthToken = async (): Promise<string | void> => {
    try {
        const token = await AsyncStorage.getItem('token')

        if (token !== null) {
            return token
        }

        alert('No authentication token!')
    } catch (error) {
        alert(error)
    }
}
