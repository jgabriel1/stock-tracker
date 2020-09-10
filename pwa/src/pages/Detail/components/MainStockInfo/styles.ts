import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 8,
    paddingHorizontal: 8,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: '#999',
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginHorizontal: 4,
  },

  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 4,
  },

  itemValue: {
    fontSize: 16,
  },
})

export default styles
