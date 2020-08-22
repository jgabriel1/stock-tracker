import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },

    chartContainer: {
        flex: 1,
        margin: 16,
        borderRadius: 16,
        backgroundColor: '#fff',

        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 15,
    },
})

export default styles