import React from 'react'
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native'
import { Transaction } from '../../../services/api/types'

interface Props {
    transactionList: Transaction[]
}

const TransactionList = ({ transactionList }: Props) => {
    const headerComponent = () => (
        <View style={styles.gridRow}>
            <View style={styles.gridColumn}>
                <Text>Quantity</Text>
            </View>

            <View style={styles.gridColumn}>
                <Text>Avg. Price</Text>
            </View>

            <View style={styles.gridColumn}>
                <Text>Total</Text>
            </View>

            <View style={styles.gridColumn}>
                <Text>Date</Text>
            </View>
        </View>
    )

    const renderItem = ({ item, index }: { item: Transaction, index: number }) => {
        const date = new Date((item.timestamp as number) * 1000)

        return (
            <View style={styles.gridRow} key={index}>
                <View style={styles.gridColumn}>
                    <Text>x{item.quantity}</Text>
                </View>

                <View style={styles.gridColumn}>
                    <Text>$ {item.average_price?.toFixed(2)}</Text>
                </View>

                <View style={styles.gridColumn}>
                    <Text>$ {item.total_value.toFixed(2)}</Text>
                </View>

                <View style={styles.gridColumn}>
                    <Text>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</Text>
                </View>
            </View>
        )
    }

    return (
        <FlatList
            style={{ width: '100%' }}
            data={transactionList}
            stickyHeaderIndices={[0]}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            ListHeaderComponent={headerComponent}
            keyExtractor={(item, index) => String(index)}
            renderItem={renderItem}
        />
    )
}

export default TransactionList

const styles = StyleSheet.create({
    gridRow: {
        width: '100%',
        padding: 16,
        backgroundColor: '#f4f4f4',
        borderColor: '#222',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    gridColumn: {
        height: '100%',
        width: Dimensions.get('window').width / 4,
        alignItems: 'center',
    },
})
