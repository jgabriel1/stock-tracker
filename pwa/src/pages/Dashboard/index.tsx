import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
    Dimensions
} from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { getAuthToken } from '../../utils/tokenHandler'
import api from '../../services/api'

interface StockInfo {
    ticker: string
    total_invested: number
    average_bought_price: number
    total_sold: number
    currently_owned_shares: number
}

const Dashboard = () => {
    const [totalInvested, setTotalInvested] = useState(0)
    const [stocks, setStocks] = useState<StockInfo[]>([])

    const navigation = useNavigation()

    useEffect(() => {
        (async () => {
            const token = await getAuthToken()
            const headers = { Authorization: `Bearer ${token}` }

            api.get('stocks', { headers })
                .then(response => {
                    const { stocks, total_applied } = response.data

                    setStocks(stocks)
                    setTotalInvested(total_applied)
                })
                .catch(error => alert(error))
        })()
    }, [])

    function navigateToDetail(item: StockInfo) {
        navigation.navigate('Detail', {
            ticker: item.ticker
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={stocks}
                keyExtractor={item => item.ticker}
                renderItem={({ item }: { item: StockInfo }) => (
                    <TouchableOpacity style={styles.gridRow} onPress={() => navigateToDetail(item)}>
                        <Text style={{ fontSize: 18 }}>{item.ticker}</Text>
                        <Text>{item.currently_owned_shares}</Text>
                        <Text>{item.average_bought_price}</Text>
                        <Text>{item.total_invested}</Text>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.listContainer}
            />
        </SafeAreaView>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    listContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    gridRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderColor: '#999',
        paddingVertical: 16,
        borderBottomWidth: 1,
        width: Dimensions.get('window').width, // probably changing this
    }
})

// https://reactnavigation.org/docs/params/