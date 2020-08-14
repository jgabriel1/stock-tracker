import React, { useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import DependentView from './components/DependentView'

import { Stock } from '../../services/api/types'
import { YahooStock } from '../../services/yahooFinance/stockInfo'
import DataContext from '../../store/dataContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import NewTransactionButton from './components/NewTransactionButton'


const StockList = () => {
    const { state } = useContext(DataContext)
    const { stocksData, yahooData } = state

    const navigation = useNavigation()

    const stocksList = Array.from(stocksData.values())

    function navigateToDetail(ticker: string): void {
        navigation.navigate('Detail', { ticker })
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={stocksList}
                keyExtractor={item => item.ticker}
                renderItem={({ item }: { item: Stock }) => {
                    const { ticker, currently_owned_shares, average_bought_price } = item

                    return (
                        <TouchableOpacity onPress={() => navigateToDetail(ticker)}>
                            <View style={styles.tickerContainer}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{ticker}</Text>
                            </View>

                            <View style={styles.gridRow}>

                                <View style={styles.gridColumn}>
                                    <Text>x{currently_owned_shares}</Text>
                                </View>

                                <View style={styles.gridColumn}>
                                    <Text>{average_bought_price.toFixed(2)}</Text>
                                </View>

                                {
                                    yahooData.has(ticker) ?
                                        <DependentView
                                            viewStyle={styles.gridColumn}
                                            average_bought_price={average_bought_price}
                                            currently_owned_shares={currently_owned_shares}

                                            // typescript forced formality, since the conditional guarantees it is defined:
                                            regularMarketPrice={(yahooData.get(ticker) as YahooStock).regularMarketPrice}
                                        />
                                        :
                                        <>
                                            <View style={styles.gridColumn}>
                                                <Text>-</Text>
                                            </View>
                                            <View style={styles.gridColumn}>
                                                <Text>-</Text>
                                            </View>
                                        </>
                                }

                            </View>
                        </TouchableOpacity>
                    )
                }}
                scrollEnabled={true}
            />
            <NewTransactionButton />
        </SafeAreaView>
    )
}

export default StockList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },

    gridRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderColor: '#999',
        paddingVertical: 16,
        borderBottomWidth: 1,
        width: Dimensions.get('window').width, // probably changing this
    },

    gridColumn: {
        height: '100%',
        width: Dimensions.get('window').width / 4,
        alignItems: 'center',
    },

    tickerContainer: {
        paddingLeft: 32,
        paddingTop: 16
    },
})
