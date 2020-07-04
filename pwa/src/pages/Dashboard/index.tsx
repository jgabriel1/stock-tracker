import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { getAuthToken } from '../../utils/tokenHandler'
import api from '../../services/api'

const Dashboard = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        getAuthToken()
            .then(token => {
                const headers = { Authorization: `Bearer ${token}` }

                api.get('users/me', { headers })
                    .then(response => {
                        const { username, email } = response.data

                        setUsername(username)
                        setEmail(email)
                    })
                    .catch(error => alert(error))
            })
            .catch(error => alert(error))
    }, [])

    return (
        <View style={styles.container}>
            <Text>Username: {username}</Text>
            <Text>Email: {email}</Text>
        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
