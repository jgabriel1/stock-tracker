import React from 'react'
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

interface Props {
    style?: ViewStyle
}


const ReturnButton = ({ style }: Props) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity
            onPress={navigation.goBack}
            style={{ ...defaultStyles.button, ...style }}
        >
            <Feather name='arrow-left' size={32} color='#000' />
        </TouchableOpacity>
    )
}

export default ReturnButton

const defaultStyles = StyleSheet.create({
    button: {
        marginTop: 12,
        marginLeft: 12,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 32,
        alignSelf: 'flex-start',
        position: 'relative'
    }
})
