import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { NavigationProp } from '@react-navigation/native'


const ReturnButton = ({ navigation }: { navigation: NavigationProp<any> }) => (
    <TouchableOpacity onPress={navigation.goBack} style={styles.button}>
        <Feather name='arrow-left' size={32} color='#000' />
    </TouchableOpacity>
)

export default ReturnButton

const styles = StyleSheet.create({
    button: {
        marginTop: 4,
        marginLeft: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 32,
    }
})
