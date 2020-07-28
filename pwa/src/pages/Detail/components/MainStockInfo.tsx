import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
    currentlyOwnedShares: number
    averageBoughtPrice: number
    regularMarketPrice: number
}

const MainStockInfo = ({ currentlyOwnedShares, averageBoughtPrice, regularMarketPrice }: Props) => {
    const totalInvested = currentlyOwnedShares * averageBoughtPrice
    const currentWorth = currentlyOwnedShares * regularMarketPrice

    const balance = currentWorth - totalInvested
    const variation = 100 * (regularMarketPrice / averageBoughtPrice - 1)

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.item}>
                    <Text style={styles.itemTitle}>Total Invested:</Text>
                    <Text style={styles.itemValue}>{`$ ${totalInvested.toFixed(2)}`}</Text>
                </View>

                <View style={styles.item}>
                    <Text style={styles.itemTitle}>Current Worth:</Text>
                    <Text style={styles.itemValue}>{`$ ${currentWorth.toFixed(2)}`}</Text>
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.item}>
                    <Text style={styles.itemTitle}>Balance:</Text>
                    <Text style={styles.itemValue}>{`$ ${balance.toFixed(2)}`}</Text>
                </View>

                <View style={styles.item}>
                    <Text style={styles.itemTitle}>Variation(%):</Text>
                    <Text style={styles.itemValue}>{`${variation.toFixed(2)} %`}</Text>
                </View>
            </View>
        </View>
    )
}

export default MainStockInfo

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 8,
        paddingHorizontal: 8,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },

    item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderRadius: 4,
        borderColor: '#999',
        paddingVertical: 8,
        paddingHorizontal: 4,
        marginHorizontal: 4,
    },

    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 4,
    },

    itemValue: {
        fontSize: 16,
    },
})
