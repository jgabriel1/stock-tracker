import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },

    listHeaderContainer: {
        paddingHorizontal: 32,
        marginTop: 32,
        marginBottom: 16,
    },

    listHeaderText: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'left',
    },

    listContainer: {
        flex: 1,
        paddingTop: 16,
        width: '95%',
        alignSelf: 'center',
    },

    listItemContainer: {
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 15,

        marginBottom: 16,
        backgroundColor: '#eee',
        borderRadius: 16,
        padding: 8,
        flexDirection: 'row',
        alignSelf: 'center',
    },

    tickerContainer: {
        justifyContent: 'center',
        paddingHorizontal: 4,
        width: '16%',
    },

    tickerText: {
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 18,
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
