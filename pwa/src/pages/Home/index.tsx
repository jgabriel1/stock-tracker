import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Button from '../../components/Button'

const Home = () => {
    const navigation = useNavigation()

    function navigateToLogin() {
        navigation.navigate('Login')
    }

    function navigateToRegister() {
        navigation.navigate('Register')
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Stock Tracker</Text>
                <Text style={styles.titleDescription}>An app to track the stocks you own and project your gains.</Text>
            </View>

            <>
                <Button text={'Login'} onPress={navigateToLogin} />
                <Button text={'Register'} onPress={navigateToRegister} />
            </>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8
    },

    titleContainer: {
        width: '80%',
        paddingBottom: 96
    },

    titleText: {
        fontSize: 32,
        fontWeight: 'bold',
        paddingBottom: 32
    },

    titleDescription: {
        fontSize: 14,
    },

    buttonContainer: {
        width: '80%',
    },

    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#999',
        height: 48,
        borderRadius: 4,
        marginBottom: 16
    },

    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    }
})

