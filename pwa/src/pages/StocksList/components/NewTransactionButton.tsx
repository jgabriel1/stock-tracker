import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { AppStackParamList } from '../../../routes/AppStack'
import { StackNavigationProp } from '@react-navigation/stack'

import { Feather } from '@expo/vector-icons'

const NewTransactionButton = () => {
    const navigation = useNavigation<StackNavigationProp<AppStackParamList>>()

    function handleNavigateToNewTransaction() {
        navigation.navigate('NewTransaction', {})
    }

    return (
        <RectButton style={styles.buttonContainer} onPress={handleNavigateToNewTransaction}>
            <View style={styles.buttonIconContainer}>
                <Feather name='plus' size={32} color='#fff' />
            </View>
            <View style={styles.buttonTextContainer}>
                <Text style={styles.buttonText}>New Transaction</Text>
            </View>
        </RectButton>
    )
}

export default NewTransactionButton

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '66%',
        alignSelf: 'center',
        marginBottom: 16,

        flexDirection: 'row',
        alignItems: 'center',

        height: 50,
        borderRadius: 25,
        backgroundColor: '#555',
    },

    buttonIconContainer: {
        alignItems: 'center',
        marginLeft: 16,
    },

    buttonTextContainer: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '600'
    },
})
