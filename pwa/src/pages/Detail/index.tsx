import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RouteProp } from '@react-navigation/native'

import { getAuthToken } from '../../utils/tokenHandler'
import api from '../../services/api'

interface DetailParams {
    ticker: string
}

interface Props {
    route: RouteProp<{ Detail: DetailParams }, 'Detail'>
}

interface Transaction {
    ticker: string
    quantity: number
    total_value: number
    timestamp: number
    average_price: number
}

const Detail = ({ route }: Props) => {
    const { ticker } = route.params

    const [transactionList, setTransactionList] = useState<Transaction[]>([])

    useEffect(() => {
        (async () => {
            const token = await getAuthToken()

            const params = { ticker }
            const headers = { Authorization: `Bearer ${token}` }

            try {
                const response = await api.get('transactions', { params, headers })

                const { transactions } = response.data
                setTransactionList(transactions)
            } catch (error) {
                alert(error)
            }
        })();
    }, [])

    return (
        <View style={styles.container}>
            {transactionList.map((transaction, index) => (
                <View style={styles.container} key={index}>
                    <Text>{transaction.quantity}</Text>
                    <Text>{transaction.average_price}</Text>
                    <Text>{transaction.total_value}</Text>
                    <Text>{transaction.timestamp}</Text>
                </View>
            ))}
        </View>
    )
}

export default Detail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
