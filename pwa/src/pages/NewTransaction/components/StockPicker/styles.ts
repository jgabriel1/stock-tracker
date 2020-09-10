import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.86,
    height: Dimensions.get('window').height * 0.67,
    paddingVertical: 32,
    paddingHorizontal: 0,
    borderRadius: 8,
    backgroundColor: '#fff',
  },

  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 4,
    padding: 16,
    width: '80%',
    fontSize: 16,
    marginBottom: 16,
  },

  listItem: {
    width: '100%',
    paddingHorizontal: 4,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#999',
  },

  listItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
})

export default styles
