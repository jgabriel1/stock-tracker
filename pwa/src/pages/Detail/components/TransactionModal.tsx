import React, { useState, useCallback } from 'react'
import { StyleSheet, Text, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native'
import Button from '../../../components/Button'
import API from '../../../services/api'
import { useNavigation } from '@react-navigation/native'
import { Transaction } from '../../../services/api/types'

interface Props {
    ticker: string
    type: 'buy' | 'sell'
}

const TransactionModal = ({ ticker, type }: Props) => {
    const [quantity, setQuantity] = useState('')
    const [totalValue, setTotalValue] = useState('')

    const navigation = useNavigation()

    // maybe create a transaction context to handle these types of differences...
    const parseData = useCallback((quantity: string, total_value: string): Transaction => {
        switch (type) {
            case 'buy':
                return {
                    ticker,
                    quantity: Number(quantity),
                    total_value: Number(total_value),
                }
            case 'sell':
                return {
                    ticker,
                    quantity: -1 * Number(quantity),
                    total_value: -1 * Number(total_value),
                }
            default:
                throw new Error('Operation not allowed!')
        }
    }, [ticker, type])

    async function handleBuyTransaction() {
        const data = parseData(quantity, totalValue)

        await API.postNewTransaction(data).catch(alert)
        navigation.navigate('Dashboard')
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <KeyboardAvoidingView style={styles.modalContainer}>
                <Text style={styles.title}>{type}</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={setQuantity}
                    autoCapitalize='none'
                    placeholder='Quantity'
                    keyboardType='number-pad'
                />

                <TextInput
                    style={styles.input}
                    onChangeText={setTotalValue}
                    autoCapitalize='none'
                    placeholder='Total Value'
                    keyboardType='number-pad'
                />

                <Button text='Confirm' onPress={handleBuyTransaction} />
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback >
    )
}

export default TransactionModal

const styles = StyleSheet.create({
    modalContainer: {
        alignItems: 'center',
        width: Dimensions.get('window').width * 0.86,
        height: Dimensions.get('window').height * 0.67,
        paddingVertical: 32,
        paddingHorizontal: 0,
        borderRadius: 8,
        backgroundColor: '#fff',
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16
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
