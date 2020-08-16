import React, { useEffect, useState, useContext, useCallback } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Feather as Icon } from '@expo/vector-icons'

import ReturnButton from '../../components/ReturnButton'
import MainStockInfo from './components/MainStockInfo'
import TransactionList from './components/TransactionList'

import API from '../../services/api'
import { Transaction } from '../../services/api/types'

import DataContext from '../../store/dataContext'
import { getStockData } from '../../store/selectors'

import { AppStackParamList } from '../../routes/AppStack'

const Detail = () => {
    const [transactionList, setTransactionList] = useState<Transaction[]>([])

    const navigation = useNavigation<StackNavigationProp<AppStackParamList>>()
    const { params: { ticker } } = useRoute<RouteProp<AppStackParamList, 'Detail'>>()

    const { state } = useContext(DataContext)
    const stockData = getStockData(state, ticker)

    const navigateToNewTransactionWith = useCallback((type: 'IN' | 'OUT') => {
        navigation.navigate('NewTransaction', {
            initialTicker: ticker,
            initialTransactionType: type
        })
    }, [ticker])

    useEffect(() => {
        API.getTransactionsFor(ticker).then(setTransactionList)
    }, [])

    return (
        <SafeAreaView style={styles.outerContainer}>

            <ReturnButton />

            <View style={styles.container}>

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{ticker}</Text>
                </View>

                {
                    stockData.regularMarketPrice &&
                    <MainStockInfo
                        averageBoughtPrice={stockData.average_bought_price}
                        currentlyOwnedShares={stockData.currently_owned_shares}
                        regularMarketPrice={stockData.regularMarketPrice}
                    />
                }

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        onPress={() => navigateToNewTransactionWith('IN')}
                        containerStyle={styles.button}
                    >
                        <Icon name='plus' size={32} color='#eee' />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigateToNewTransactionWith('OUT')}
                        containerStyle={styles.button}
                    >
                        <Icon name='minus' size={32} color='#eee' />
                    </TouchableOpacity>
                </View>

                <TransactionList transactionList={transactionList} />

            </View>

        </SafeAreaView>
    )
}

export default Detail

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },

    titleContainer: {
        width: '80%',
        marginBottom: 16,
    },

    title: {
        fontSize: 32,
        fontWeight: 'bold',
    },

    buttonsContainer: {
        flexDirection: 'row',
        width: '80%',
    },

    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        borderRadius: 4,
        marginBottom: 16,
        backgroundColor: '#999',
    },
})
