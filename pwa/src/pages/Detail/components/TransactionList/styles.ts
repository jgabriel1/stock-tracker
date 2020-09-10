import { StyleSheet, Dimensions } from 'react-native'

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

export default styles
