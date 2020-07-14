import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import ReturnButton from '../../components/ReturnButton'
import Button from '../../components/Button'

import api from '../../services/api'
import { getAuthToken } from '../../utils/tokenHandler'

/** TODO:
 * Refresh dashboard somehow on submitting the new transaction form when navigating back
 * Setup the TextInput+Picker component somehow to integrate with yahoo query api
 */

const NewTransaction = () => {
    const [ticker, setTicker] = useState('')
    const [quantity, setQuantity] = useState('')
    const [totalValue, setTotalValue] = useState('')

    const navigation = useNavigation()

    function handleSubmitTransaction() {
        const data = {
            ticker,
            quantity: Number(quantity),
            total_value: Number(totalValue),
        }

        getAuthToken()
            .then(token => {
                const headers = { Authorization: `Bearer ${token}` }

                api.post('transactions', data, { headers })
                    .then(() => {
                        navigation.navigate('Dashboard')
                    })
                    .catch(error => alert(error))
            })
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.headerContainer}>
                <ReturnButton navigation={navigation} />
            </View>

            <ScrollView alwaysBounceVertical={false} contentContainerStyle={styles.mainContent}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 32 }}>New Transaction</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={text => setTicker(text)}
                    autoCapitalize='none'
                    placeholder='Stock Ticker'
                />

                <TextInput
                    style={styles.input}
                    onChangeText={text => setQuantity(text)}
                    autoCapitalize='none'
                    placeholder='Quantity'
                    keyboardType='number-pad'
                />

                <TextInput
                    style={styles.input}
                    onChangeText={text => setTotalValue(text)}
                    autoCapitalize='none'
                    placeholder='Total Value'
                    keyboardType='number-pad'
                />

                <Button text='Create' onPress={handleSubmitTransaction} />

            </ScrollView>

        </SafeAreaView>
    )
}

export default NewTransaction

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    headerContainer: {
        alignItems: 'flex-start'
    },

    closeButton: {
        marginRight: 24,
        marginTop: 24
    },

    mainContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 8,
        paddingHorizontal: 8,
    },

    input: {
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 4,
        padding: 16,
        width: '80%',
        fontSize: 16,
        marginBottom: 16
    },
})
