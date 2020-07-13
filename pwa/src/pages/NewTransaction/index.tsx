import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ReturnButton from '../../components/ReturnButton'


const NewTransaction = () => {
    const navigation = useNavigation()

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.headerContainer}>
                <ReturnButton {...{ navigation }} />
            </View>

            <ScrollView alwaysBounceVertical={false} contentContainerStyle={styles.mainContent}>
                <Text>Test Modal</Text>
            </ScrollView>

        </SafeAreaView>
    )
}

export default NewTransaction

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    headerContainer: {
        alignItems: 'flex-start'
    },

    closeButton: {
        marginRight: 24,
        marginTop: 24
    },

    mainContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 8,
        paddingHorizontal: 8,
    },
})
