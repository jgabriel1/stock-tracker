import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { RouteProp, useRoute } from '@react-navigation/native'
import { AppLoading } from 'expo'
import { Feather as Icon } from '@expo/vector-icons'

import ReturnButton from '../../components/ReturnButton'
import Modal, { ModalProvider } from '../../components/Modal'
import MainStockInfo from './components/MainStockInfo'
import TransactionList from './components/TransactionList'
import TransactionModal from './components/TransactionModal'

import API from '../../services/api'
import { Transaction, Stock } from '../../services/api/types'
import { YahooStock } from '../../services/yahooFinance/stockInfo'
import DataContext from '../../store/dataContext'

import { AppStackParamList } from '../../routes'


const Detail = () => {
    const route = useRoute<RouteProp<AppStackParamList, 'Detail'>>()
    const { ticker } = route.params

    const [transactionList, setTransactionList] = useState<Transaction[]>([])
    const [showBuyModal, setShowBuyModal] = useState(false)
    const [showSellModal, setShowSellModal] = useState(false)

    const { state } = useContext(DataContext)
    const { stocksData, isStocksDataReady, yahooData, isYahooDataReady } = state

    const { currently_owned_shares, average_bought_price } = stocksData.get(ticker) as Stock
    const { regularMarketPrice } = yahooData.get(ticker) as YahooStock

    useEffect(() => {
        API.getTransactionsFor(ticker).then(setTransactionList)
    }, [])

    if (!isStocksDataReady || !isYahooDataReady) {
        return <AppLoading />
    }

    return (
        <ModalProvider>
            <SafeAreaView style={styles.outerContainer}>

                <ReturnButton />

                <View style={styles.container}>

                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{ticker}</Text>
                    </View>

                    <MainStockInfo
                        averageBoughtPrice={average_bought_price}
                        currentlyOwnedShares={currently_owned_shares}
                        regularMarketPrice={regularMarketPrice}
                    />

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            onPress={() => setShowBuyModal(true)}
                            containerStyle={styles.button}
                        >
                            <Icon name='plus' size={32} color='#eee' />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setShowSellModal(true)}
                            containerStyle={styles.button}
                        >
                            <Icon name='minus' size={32} color='#eee' />
                        </TouchableOpacity>
                    </View>

                    <TransactionList transactionList={transactionList} />

                </View>

                <>
                    <Modal visible={showBuyModal} onDismiss={() => setShowBuyModal(false)}>
                        <TransactionModal ticker={ticker} type='buy' />
                    </Modal>

                    <Modal visible={showSellModal} onDismiss={() => setShowSellModal(false)}>
                        <TransactionModal ticker={ticker} type='sell' />
                    </Modal>
                </>
            </SafeAreaView>
        </ModalProvider>
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
