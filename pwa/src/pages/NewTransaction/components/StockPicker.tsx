import React, { useState, SetStateAction, Dispatch, useCallback } from 'react'
import { StyleSheet, Text, View, TextInput, FlatList, Button, Dimensions } from 'react-native'

import { getSearchQuery, YahooSearchAnswers } from '../../../services/yahooFinance/stockSearch'

interface Props {
    tickerValue: string
    valueSetter: Dispatch<SetStateAction<string>>
}


const StockPicker = ({ tickerValue, valueSetter }: Props) => {
    const [answerList, setAnswerList] = useState<YahooSearchAnswers[]>([])

    const searchForText = useCallback(async (text: string) => {
        const answers = await getSearchQuery(text)
        setAnswerList(answers)
    }, [])

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={text => searchForText(text)}
                autoCapitalize='none'
                placeholder='Stock Ticker'
            />

            {answerList.map(answer => (
                <Text>{answer.symbol}</Text>
            ))}
        </View>
    )
}

export default StockPicker

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: Dimensions.get('window').width * 0.8,
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
})
