import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },

    listContainer: {
        alignItems: 'center',
        paddingVertical: 16,
    },

    listItemContainer: {
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 15,

        marginBottom: 16,
        width: '90%',
        backgroundColor: '#eee',
        borderRadius: 16,
        padding: 8,
        flexDirection: 'row',
    },

    tickerContainer: {
        justifyContent: 'center',
        paddingHorizontal: 4,
    },

    tickerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    infoContainer: {
        flex: 1,
    },

    infoLabelsContainer: {
        flexDirection: 'row',
    },

    infoLabelItem: {
        flex: 1,
        paddingTop: 8,
        alignItems: 'center',
    },

    infoLabelText: {
        fontSize: 12,
        fontWeight: 'bold',
    },

    infoValuesContainer: {
        flexDirection: 'row',
    },

    infoValueItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
    },

    redText: {
        color: '#d00',
    },

    greenText: {
        color: '#0a0'
    },
})

export default styles
