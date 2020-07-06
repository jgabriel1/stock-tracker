import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RouteProp } from '@react-navigation/native'

interface DetailParams {
    ticker: string
}

interface Props {
    route: RouteProp<{ Detail: DetailParams }, 'Detail'>
}

const Detail = ({ route }: Props) => {
    const { ticker } = route.params

    return (
        <View style={styles.container}>
            <Text>{ticker}</Text>
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
