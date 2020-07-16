import React, { useState, SetStateAction, Dispatch, useCallback } from 'react'
import { StyleSheet, Text, View, TextInput, FlatList, Button, Dimensions, TouchableOpacity } from 'react-native'

import useDebounce from '../../../hooks/useDebounce'

import { getSearchQuery, YahooSearchAnswer } from '../../../services/yahooFinance/stockSearch'


interface Props {
    ticker: string
    setTicker: Dispatch<SetStateAction<string>>
    setShowStockPicker: Dispatch<SetStateAction<boolean>>
}


const StockPicker = ({ ticker, setTicker, setShowStockPicker }: Props) => {
    const [answerList, setAnswerList] = useState<YahooSearchAnswer[]>([])

    const debouncedQuery = useDebounce(async (text: string) => {
        if (text.length > 1) {
            const answers = await getSearchQuery(text)
            setAnswerList(answers)
        } else {
            setAnswerList([])
        }
    }, 500)

    const handleSelectStock = useCallback((symbol: string) => {
        setTicker(symbol)
        setShowStockPicker(false)
    }, [])

    return (
        <View style={styles.container}>

            <TextInput
                style={styles.input}
                onChangeText={text => debouncedQuery(text)}
                autoCapitalize='none'
                placeholder='Stock Ticker'
            />

            <FlatList
                data={answerList}
                keyExtractor={answer => answer.symbol}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.listItem} onPress={() => handleSelectStock(item.symbol)}>

                        <View style={{ ...styles.listItemRow, marginBottom: 8 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.symbol}</Text>
                            <Text>{`${item.typeDisp} - ${item.exchange}`}</Text>
                        </View>

                        <View style={styles.listItemRow}>
                            <Text>{item.longname ? item.longname : '-'}</Text>
                        </View>

                    </TouchableOpacity>
                )}
                style={{ width: '80%', borderColor: '#999' }}
                showsVerticalScrollIndicator={false}
            />

        </View>
    )
}

export default StockPicker

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: Dimensions.get('window').width * 0.86,
        height: Dimensions.get('window').height * 0.67,
        paddingVertical: 32,
        paddingHorizontal: 0,
        borderRadius: 8,
        backgroundColor: '#fff',
    },

    input: {
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 4,
        padding: 16,
        width: '80%',
        fontSize: 16,
        marginBottom: 16,
    },

    listItem: {
        width: '100%',
        paddingHorizontal: 4,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: '#999'
    },

    listItemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
})
