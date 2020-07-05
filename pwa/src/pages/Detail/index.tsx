import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
    ticker: string
}

const Detail = (props: Props) => {
    return (
        <View>
            <Text>Details for {props.ticker}</Text>
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
