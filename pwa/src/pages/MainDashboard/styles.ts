import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },

    chartContainer: {
        flex: 1,
        marginTop: 16,
        marginHorizontal: 16,
        borderRadius: 16,
        backgroundColor: '#f1f1f1',

        justifyContent: 'center',

        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 15,
    },

    chartTitle: {
        fontSize: 24,
        marginLeft: 24,
        marginTop: 16,
        marginBottom: 16,
        fontWeight: 'bold'
    },

    outterInfoContainer: {
        flex: 0.66,
    },

    infoContainer: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    infoTitle: {
        marginBottom: 16,
        fontSize: 16,
        fontWeight: 'bold',
    },

    infoValue: {
        fontSize: 18,
    },

    redText: {
        color: '#d00',
    },

    greenText: {
        color: '#0a0'
    },
})

export default styles