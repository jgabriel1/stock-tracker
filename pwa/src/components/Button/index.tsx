import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    GestureResponderEvent
} from 'react-native'

interface Props {
    text: string
    onPress: (event: GestureResponderEvent) => void
}

const Button = (props: Props) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={props.onPress}>
                <Text style={styles.buttonText}>{props.text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Button

const styles = StyleSheet.create({
    buttonContainer: {
        width: '80%',
    },

    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#999',
        height: 48,
        borderRadius: 4,
        marginBottom: 16
    },

    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    }
})

